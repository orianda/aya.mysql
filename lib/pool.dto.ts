import Item from "./Item";
import List from "./List";
import {Session} from "@mysql/xdevapi";

export type PoolOptionsDto = PoolOptionsDatabaseDto | PoolOptionsSchemaDto;

interface PoolOptionsDatabaseDto extends PoolOptionsCommonDto {
  database: string;
}

interface PoolOptionsSchemaDto extends PoolOptionsCommonDto {
  schema: string;
}

interface PoolOptionsCommonDto {
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string;
  schema?: string;
}

export interface PoolDto {
  (): Promise<Session>;

  list(table: string): PoolListDto;
}

export interface PoolListDto extends List {
  item(id: string): PoolItemDto;
}

export interface PoolItemDto extends Item {
}
