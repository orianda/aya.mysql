import { URI } from "@mysql/xdevapi";
export interface PoolOptions extends URI {
    readonly host: URI['host'];
    readonly port: URI['port'];
    readonly user: URI['user'];
    readonly password: URI['password'];
    readonly schema?: string;
}
