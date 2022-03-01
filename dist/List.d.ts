import { AmountDto, NamesDto, OffsetDto, OrderDto, ValueDto, WhereDto } from "aya.mysql.querylizer";
import { Doer } from "./Doer";
import { Item } from "./Item";
export declare class List<Data extends Record<string | number, ValueDto>> {
    readonly doer: Doer;
    readonly table: string;
    readonly schema?: string | undefined;
    private querylize;
    constructor(doer: Doer, table: string, schema?: string | undefined);
    item<Id extends keyof Data>(id: Id): Item<Id, Data>;
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number>;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ReadonlyArray<Data>>;
    insert(values: Data): Promise<number>;
    update(values: Partial<Data>, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    replace(values: Data, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
}
