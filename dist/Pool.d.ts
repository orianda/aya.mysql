import { Session, URI } from "@mysql/xdevapi";
import { List } from "./List";
import { Item } from "./Item";
export declare class Pool {
    private readonly schema;
    private readonly client;
    constructor({ schema, ...connection }: PoolOptions);
    pool(): Promise<Session>;
    list(table: string, schema?: string): PoolList;
}
export interface PoolOptions extends URI {
    host: URI['host'];
    port: URI['port'];
    user: URI['user'];
    password: URI['password'];
    schema: string;
}
export interface PoolList extends List {
    item(id: string): PoolItem;
}
export interface PoolItem extends Item {
}
