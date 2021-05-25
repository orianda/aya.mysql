import {getSession, Session, URI} from "@mysql/xdevapi";
import {List} from "./List";
import {Item} from "./Item";

export class Pool {

  private readonly schema: string;
  private readonly config: Omit<PoolOptions, 'schema'>;

  constructor({schema, ...connection}: PoolOptions) {
    this.schema = schema;
    this.config = connection;
  }

  pool(): Promise<Session> {
    return getSession(this.config);
  }

  list(table: string, schema: string = this.schema): PoolList {
    const pool = this.pool.bind(this);
    const list = new List(pool, table, schema);
    const item = (id: string): PoolItem => new Item(list, id);
    return Object.assign(list, {item});
  }
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
