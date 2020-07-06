import { Amount, Names, Offset, Order, Where } from "aya.mysql.querylizer";
import { Result } from "@mysql/xdevapi";
import { PoolDto } from "./pool.dto";
import { RowDto } from "./List.dto";
export default class List {
    pool: PoolDto;
    table: string;
    constructor(pool: PoolDto, table: string);
    submit(query: string): Promise<Result>;
    count(where?: Where, amount?: Amount, offset?: Offset): Promise<number>;
    select(names?: Names, where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<ReadonlyArray<RowDto>>;
    insert(data?: RowDto): Promise<number | undefined>;
    update(data?: RowDto, where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<number>;
    remove(where?: Where, amount?: Amount, offset?: Offset, order?: Order): Promise<number>;
}
