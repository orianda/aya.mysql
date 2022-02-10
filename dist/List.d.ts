import { AmountDto, NamesDto, OffsetDto, OrderDto, ValuesDto, ValuesListDto, WhereDto } from "aya.mysql.querylizer";
import { Doer } from "./Doer";
import { Item } from "./Item";
export declare class List {
    readonly doer: Doer;
    readonly table: string;
    readonly schema?: string | undefined;
    private querylize;
    constructor(doer: Doer, table: string, schema?: string | undefined);
    item(id: string): Item;
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number>;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ValuesListDto>;
    insert(values?: ValuesDto): Promise<number | undefined>;
    update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
}
