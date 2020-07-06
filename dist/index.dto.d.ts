import Item from "./Item";
import List from "./List";
import { PoolDto } from "./pool.dto";
export interface LibPoolDto extends PoolDto {
    list(table: string): LibListDto;
}
export interface LibListDto extends List {
    item(id: string): LibItemDto;
}
export interface LibItemDto extends Item {
}
