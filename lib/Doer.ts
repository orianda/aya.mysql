import {Column, Literal, SqlResult} from '@mysql/xdevapi';
import {ValueDto, ValuesItemDto} from 'aya.mysql.querylizer';
import {List} from './List';
import {Pool} from './Pool';
import {PoolOptions} from './Pool.types';

export class Doer {

  constructor(
    public readonly pool: Pool
  ) {
  }

  list<Data extends Record<string | number, ValueDto>>(table: string, schema?: PoolOptions['schema']): List<Data> {
    return new List<Data>(this, table, schema || this.pool.schema);
  }

  count(query: string, values?: ReadonlyArray<string>): Promise<number> {
    return this
      .submit(query, values)
      .then((result) => {
        const [olga] = result.fetchOne();
        return isNaN(olga as number) ? NaN : olga as number;
      });
  }

  select<T extends Record<string, ValueDto>>(query: string, values?: ReadonlyArray<string>): Promise<ReadonlyArray<T>> {
    return this
      .submit(query, values)
      .then((result) => {
        const rows = result.fetchAll();
        const cols = result
          .getColumns()
          .map((col: Column) => col.getColumnName());
        return rows
          .map((list) => {
            const data: ValuesItemDto = {};
            for (let i = 0, l = cols.length; i < l; i++) {
              const name = cols[i];
              const value = list[i];
              data[name] = value instanceof Buffer ? value.toString() : value === null ? undefined : value as ValueDto;
            }
            return data as T;
          });
      });
  }

  insert(query: string, values?: ReadonlyArray<string>): Promise<string | number | bigint> {
    return this
      .submit(query, values)
      .then((result) => result.getAutoIncrementValue());
  }

  update(query: string, values?: ReadonlyArray<string>): Promise<string | number | bigint> {
    return this
      .submit(query, values)
      .then((result) => result.getAffectedItemsCount());
  }

  replace(query: string, values?: ReadonlyArray<string>): Promise<string | number | bigint> {
    return this
      .submit(query, values)
      .then((result) => result.getAffectedItemsCount());
  }

  remove(query: string, values?: ReadonlyArray<string>): Promise<string | number | bigint> {
    return this
      .submit(query, values)
      .then((result) => result.getAffectedItemsCount());
  }

  submit(query: string, values: ReadonlyArray<Literal> = []): Promise<SqlResult> {
    return this.pool
      .open()
      .then((session) => {
        const [arg, ...args] = values;
        const promise1 = session
          .sql(query)
          .bind(arg ?? null, ...args)
          .execute();
        const promise2 = promise1
          .catch(() => undefined)
          .then(() => session.close());
        return Promise
          .all([promise1, promise2])
          .then(([result]) => result);
      });
  }
}
