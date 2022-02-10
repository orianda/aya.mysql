import {Schema} from "./Schema";
import {SqlExecute} from "./SqlExecute";

export interface Session {

  commit(): Promise<boolean>;

  createSchema(name: string): Promise<Schema>;

  dropSchema(name: string): Promise<boolean>;

  getDefaultSchema(): Schema;

  getSchema(name: string): Schema;

  getSchemas(): ReadonlyArray<Schema>;

  releaseSavepoint(name?: string): Promise<void>;

  rollback(): Promise<boolean>;

  rollbackTo(name: string): Promise<void>;

  setSavepoint(name: string): Promise<string>;

  sql(query: string): SqlExecute;

  startTransaction(): Promise<boolean>;

  // connect(): Promise<Session>;
  //
  // reset(): Promise<void>;

  close(): Promise<void>;

  // disconnect(): Promise<void>;
  //
  // inspect(): Record<'auth' | 'host' | 'pooling' | 'port' | 'schema' | 'socket' | 'ssl' | 'user' | any>;
}
