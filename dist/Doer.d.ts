import { SqlResult } from "@mysql/xdevapi";
import { ValuesListDto } from "aya.mysql.querylizer";
import { List } from "./List";
import { Pool } from "./Pool";
import { PoolOptions } from "./Pool.types";
export declare class Doer {
    readonly pool: Pool;
    constructor(pool: Pool);
    list(table: string, schema?: PoolOptions['schema']): List;
    count(query: string, values?: ReadonlyArray<string>): Promise<number>;
    select(query: string, values?: ReadonlyArray<string>): Promise<ValuesListDto>;
    insert(query: string, values?: ReadonlyArray<string>): Promise<number | undefined>;
    update(query: string, values?: ReadonlyArray<string>): Promise<number>;
    replace(query: string, values?: ReadonlyArray<string>): Promise<number>;
    remove(query: string, values?: ReadonlyArray<string>): Promise<number>;
    submit(query: string, values?: ReadonlyArray<string>): Promise<SqlResult>;
}
