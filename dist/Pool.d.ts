import { Session } from '@mysql/xdevapi';
import { Doer } from './Doer';
import { PoolOptions } from './Pool.types';
export declare class Pool {
    readonly schema: PoolOptions['schema'];
    readonly config: Omit<PoolOptions, 'schema'>;
    constructor({ schema, ...connection }: PoolOptions);
    doer(): Doer;
    open(): Promise<Session>;
}
