import { Result } from "@mysql/xdevapi";
import { AmountDto, NamesDto, OffsetDto, OrderDto, ValuesDto, ValuesListDto, WhereDto } from "aya.mysql.querylizer";
import { PoolDto } from "./pool.dto";
export default class List {
    private readonly pool;
    readonly table: string;
    private querylize;
    constructor(pool: PoolDto, table: string);
    submit(query: string): Promise<Result>;
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): Promise<number>;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<ValuesListDto>;
    insert(values?: ValuesDto): Promise<number | undefined>;
    update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): Promise<number>;
}
