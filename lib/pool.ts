import mysql from "@mysql/xdevapi";
import {PoolDto, PoolOptionsDto} from "./pool.dto";

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

  return () => client.getSession();
};
