import {Result} from "@mysql/xdevapi";
import {
  AmountDto,
  NamesDto,
  OffsetDto,
  OrderDto,
  Table,
  ValuesDto,
  ValuesItemDto,
  ValuesListDto,
  WhereDto
} from "aya.mysql.querylizer";
import {PoolDto} from "./pool.dto";

export default class List {

  private querylize: Table;

  constructor(
    private readonly pool: PoolDto,
    public readonly table: string
  ) {
    this.querylize = new Table(table);
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

  count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number> {
    const query = this.querylize.count(where, amount, offset);
    return this
      .submit(query)
      .then((result) => result.toArray()[0][0][0]);

  }

  select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ValuesListDto> {
    const query = this.querylize.select(names, where, amount, offset, order);
    return this
      .submit(query)
      .then((result) => {
        const rows = result.getResults()[0];
        if (!rows) {
          return [];
        }

        const cols = result
          .getColumns()
          .map((col) => col.getColumnName());
        return rows
          .map((row) => {
            const data: ValuesItemDto = {};
            for (let i = 0, l = cols.length; i < l; i++) {
              const name = cols[i];
              data[name] = row[i];
            }
            return data;
          });
      });
  }

  insert(values?: ValuesDto): Promise<number | undefined> {
    const query = this.querylize.insert(values);
    return this
      .submit(query)
      .then((result) => result.getAutoIncrementValue());
  }

  update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number> {
    const query = this.querylize.update(values, where, amount, offset, order);
    if (query) {
      return this
        .submit(query)
        .then((result) => result.getAffectedItemsCount());
    } else {
      return Promise.resolve(0);
    }
  }

  replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number> {
    const query = this.querylize.replace(values, where, amount, offset, order);
    if (query) {
      return this
        .submit(query)
        .then((result) => result.getAffectedItemsCount());
    } else {
      return Promise.resolve(0);
    }
  }

  remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number> {
    const query = this.querylize.remove(where, amount, offset, order);
    return this
      .submit(query)
      .then((result) => result.getAffectedItemsCount());
  }
}
