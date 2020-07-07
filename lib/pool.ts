import mysql from "@mysql/xdevapi";
import {PoolDto, PoolItemDto, PoolListDto, PoolOptionsDto} from "./pool.dto";
import List from "./List";
import Item from "./Item";

export default (options: PoolOptionsDto): PoolDto => {
  const client = mysql.getClient({
    ...options,
    schema: options.schema || options.database as string,
    pooling: {
      enabled: true,
      maxSize: 1,
      maxIdleTime: 1000,
      queueTimeout: 2000
    }
  });
  const pool: PoolDto = () => client.getSession();
  pool.list = (table: string): PoolListDto => {
    const list = new List(pool, table);
    const item = (id: string): PoolItemDto => new Item(list, id);
    return Object.assign(list, {item});
  };
  return pool;
};
