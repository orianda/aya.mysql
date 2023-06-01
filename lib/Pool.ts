import {getSession, Session} from '@mysql/xdevapi';
import {Doer} from './Doer';
import {PoolOptions} from './Pool.types';

export class Pool {

  public readonly schema: PoolOptions['schema'];
  public readonly config: Omit<PoolOptions, 'schema'>;

  constructor({schema, ...connection}: PoolOptions) {
    this.schema = schema;
    this.config = connection;
  }

  doer(): Doer {
    return new Doer(this);
  }

  open(): Promise<Session> {
    return getSession(this.config);
  }
}
