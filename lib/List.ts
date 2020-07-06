import querylize, {Amount, Names, Offset, Order, Where} from "aya.mysql.querylizer";
import {Result} from "@mysql/xdevapi";
import {PoolDto} from "./pool.dto";
import {RowDto} from "./List.dto";

export default class List {

  pool: PoolDto;
  table: string;

  constructor(pool: PoolDto, table: string) {
    this.pool = pool;
    this.table = table;
  }

  submit(query: string): Promise<Result> {
    return this
      .pool()
      .then((session) => {
        const promise1 = session
          .sql(query)
          .execute();
        const promise2 = promise1
          .then(() => undefined, () => undefined)
          .then(() => session.close());
        return Promise
          .all([promise1, promise2])
          .then(([result]) => result);
      });
  }

  count(where?: Where, amount?: Amount, offset?: Offset): Promise<number> {
    const whereQuery = querylize.where(where);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`SELECT COUNT(*) FROM \`${this.table}\` ${whereQuery} ${limitQuery}`)
      .then((result) => result.toArray()[0][0][0]);

  }

  select(names?: Names, where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<ReadonlyArray<RowDto>> {
    const namesQuery = querylize.names(names);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`SELECT ${namesQuery} FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
      .then((result) => {
        const cols = result
          .getColumns()
          .map((col) => col.getColumnName());
        return result
          .getResults()[0]
          .map((row) => {
            const data: RowDto = {};
            for (let i = 0, l = cols.length; i < l; i++) {
              const name = cols[i];
              data[name] = row[i];
            }
            return data;
          });
      });
  }

  insert(data?: RowDto): Promise<number | undefined> {
    const valueQuery = querylize.values(data) || '() VALUES ()';
    return this
      .submit(`INSERT INTO \`${this.table}\` ${valueQuery}`)
      .then((result) => result.getAutoIncrementValue());
  }

  update(data?: RowDto, where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<number> {
    const valueQuery = querylize.values(data);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    if (valueQuery) {
      return this
        .submit(`UPDATE \`${this.table}\` ${valueQuery} ${whereQuery} ${orderQuery} ${limitQuery}`)
        .then((result) => result.getAffectedItemsCount());
    } else {
      return Promise.resolve(0);
    }
  }

  remove(where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<number> {
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`DELETE FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
      .then((result) => result.getAffectedItemsCount());
  }
}
