import List from "./List";
import Item from "./Item";
import {PoolOptionsDto} from "./pool.dto";
import getPool from "./pool";
import {LibItemDto, LibListDto, LibPoolDto} from "./index.dto";

export default (options: PoolOptionsDto): LibPoolDto => {
  const pool = getPool(options);
  const list = (table: string): LibListDto => {
    const list = new List(pool, table);
    const item = (id: string): LibItemDto => new Item(list, id);
    return Object.assign(list, {item});
  };
  return Object.assign(pool, {list});
};
