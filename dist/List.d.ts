import { AmountDto, NamesDto, OffsetDto, OrderDto, ValueDto, WhereDto } from 'aya.mysql.querylizer';
import { Doer } from './Doer';
import { Item } from './Item';
import { PoolOptions } from './Pool.types';
export declare class List<Data extends Record<string | number, ValueDto>> {
    readonly doer: Doer;
    readonly table: string;
    readonly schema?: PoolOptions['schema'];
    private querylize;
    constructor(doer: Doer, table: string, schema?: PoolOptions['schema']);
    item<Id extends keyof Data>(id: Id): Item<Id, Data>;
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number>;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ReadonlyArray<Data>>;
    insert(values: Data): Promise<string | number | bigint>;
    update(values: Partial<Data>, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<string | number | bigint>;
    replace(values: Data, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<string | number | bigint>;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<string | number | bigint>;
}
