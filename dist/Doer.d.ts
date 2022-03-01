import { SqlResult } from "@mysql/xdevapi";
import { ValueDto } from "aya.mysql.querylizer";
import { List } from "./List";
import { Pool } from "./Pool";
import { PoolOptions } from "./Pool.types";
export declare class Doer {
    readonly pool: Pool;
    constructor(pool: Pool);
    list<Data extends Record<string | number, ValueDto>>(table: string, schema?: PoolOptions['schema']): List<Data>;
    count(query: string, values?: ReadonlyArray<string>): Promise<number>;
    select<T extends Record<string, ValueDto>>(query: string, values?: ReadonlyArray<string>): Promise<ReadonlyArray<T>>;
    insert(query: string, values?: ReadonlyArray<string>): Promise<number>;
    update(query: string, values?: ReadonlyArray<string>): Promise<number>;
    replace(query: string, values?: ReadonlyArray<string>): Promise<number>;
    remove(query: string, values?: ReadonlyArray<string>): Promise<number>;
    submit(query: string, values?: ReadonlyArray<string>): Promise<SqlResult>;
}
