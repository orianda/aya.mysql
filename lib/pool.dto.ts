import {Session} from "@mysql/xdevapi";

export type PoolDto = () => Promise<Session>;

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

