import { ConnectionOptions } from "@mysql/xdevapi";
export interface PoolOptions extends ConnectionOptions {
    readonly host: ConnectionOptions['host'];
    readonly port: ConnectionOptions['port'];
    readonly user: ConnectionOptions['user'];
    readonly password: ConnectionOptions['password'];
    readonly schema?: string;
}
