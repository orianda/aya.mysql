import { AmountDto, NamesDto, OffsetDto, OrderDto, ValuesDto, ValuesListDto, WhereDto } from "aya.mysql.querylizer";
import { Pool } from "./Pool";
export declare class List {
    private readonly pool;
    readonly table: string;
    readonly schema?: string | undefined;
    private querylize;
    constructor(pool: Pool['pool'], table: string, schema?: string | undefined);
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number>;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ValuesListDto>;
    insert(values?: ValuesDto): Promise<number | undefined>;
    update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    private submit;
}
