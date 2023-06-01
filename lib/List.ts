import {AmountDto, NamesDto, OffsetDto, OrderDto, Table, ValueDto, WhereDto} from 'aya.mysql.querylizer';
import {Doer} from './Doer';
import {Item} from './Item';
import {PoolOptions} from './Pool.types';

export class List<Data extends Record<string | number, ValueDto>> {

  private querylize: Table;

  constructor(
    public readonly doer: Doer,
    public readonly table: string,
    public readonly schema?: PoolOptions['schema']
  ) {
    this.querylize = new Table(table, schema);
  }

  item<Id extends keyof Data>(id: Id): Item<Id, Data> {
    return new Item<Id, Data>(this, id);
  }

  count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number> {
    const query = this.querylize.count(where, amount, offset);
    return this.doer.count(query);
  }

  select(
    names?: NamesDto,
    where?: WhereDto,
    amount?: AmountDto,
    offset?: OffsetDto,
    order?: OrderDto
  ): Promise<ReadonlyArray<Data>> {
    const query = this.querylize.select(names, where, amount, offset, order);
    return this.doer.select<Data>(query);
  }

  insert(values: Data): Promise<string | number | bigint> {
    const query = this.querylize.insert(values);
    return this.doer.insert(query);
  }

  update(
    values: Partial<Data>,
    where?: WhereDto,
    amount?: AmountDto,
    offset?: OffsetDto,
    order?: OrderDto
  ): Promise<string | number | bigint> {
    const query = this.querylize.update(values, where, amount, offset, order);
    return query ? this.doer.update(query) : Promise.resolve(0);
  }

  replace(
    values: Data,
    where?: WhereDto,
    amount?: AmountDto,
    offset?: OffsetDto,
    order?: OrderDto
  ): Promise<string | number | bigint> {
    const query = this.querylize.replace(values, where, amount, offset, order);
    return query ? this.doer.replace(query) : Promise.resolve(0);
  }

  remove(
    where?: WhereDto,
    amount?: AmountDto,
    offset?: OffsetDto,
    order?: OrderDto
  ): Promise<string | number | bigint> {
    const query = this.querylize.remove(where, amount, offset, order);
    return this.doer.remove(query);
  }
}
