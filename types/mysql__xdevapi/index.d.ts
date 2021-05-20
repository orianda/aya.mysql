import {FieldDefinition, IndexDefinition} from "./Collection";
import {
  CreateCollectionOptions,
  ModifyCollectionOptions,
  SchemaMetadata,
  SchemaValidationOptions,
  ValidationLevel
} from "./Schema";
import {WarningLevel} from "./Warning";
import {ColMetadata} from "./Row";

export declare module '@mysql/xdevapi' {

  export {Client} from "./Client";
  export {Collection, IndexDefinition, IndexDefinitionType, FieldDefinition} from "./Collection";
  export {CollectionAdd} from "./CollectionAdd";
  export {CollectionFind} from "./CollectionFind";
  export {CollectionModify} from "./CollectionModify";
  export {CollectionRemove} from "./CollectionRemove";
  export {Column} from "./Column";
  export {DocResult} from "./DocResult";
  export {DocumentCursor} from "./DocumentCursor";
  export {MetadataCursor} from "./MetadataCursor";
  export {Result} from "./Result";
  export {RowCursor} from "./RowCursor";
  export {RowResult} from "./RowResult";
  export {Row, ColMetadata, ColMetadataValue, ColMetadataType, ColMetadataJSON, RowJSON, RowValue} from "./Row";
  export {
    Schema,
    CreateCollectionOptions,
    SchemaValidationOptions,
    ValidationLevel,
    SchemaMetadata,
    ModifyCollectionOptions
  } from "./Schema";
  export {Session} from "./Session";
  export {SqlExecute} from "./SqlExecute";
  export {SqlResult} from "./SqlResult";
  export {Table} from "./Table";
  export {TableDelete} from "./TableDelete";
  export {TableInsert} from "./TableInsert";
  export {TableSelect} from "./TableSelect";
  export {TableUpdate} from "./TableUpdate";
  export {Warning, WarningLevel} from "./Warning";

  export function expr(value: string, options?: ParserOptions): any;

  export interface ParserOptions {
    mode: Mode;
  }

  export enum Mode {
    TABLE = 'TABLE',
    DOCUMENT = 'DOCUMENT'
  }

  export function getClient(connection: string | URI, options?: ClientOptions): Client;

  export interface URI {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    auth?: AuthMethod;
    ssl?: boolean;
    tls?: TLSOptions;
    connectTimeout?: number;
    connectionAttributes?: Record<string, any>;
  }

  export enum AuthMethod {
    PLAIN = 'PLAIN',
    MYSQL41 = 'MYSQL41',
    SHA256_MEMORY = 'SHA256_MEMORY',
  }

  export interface TLSOptions {
    ca?: string;
    crl?: string;
    versions?: ReadonlyArray<TLSVersions>;
  }

  export enum TLSVersions {
    TLSv1 = 'TLSv1',
    TLSv1_1 = 'TLSv1.1',
    TLSv1_2 = 'TLSv1.2',
    TLSv1_3 = 'TLSv1.3'
  }

  export interface ClientOptions {
    pooling?: PoolOptions;
  }

  export interface PoolOptions {
    enabled?: boolean;
    maxSize?: number;
    maxIdleTime?: number;
    queueTimeout: number;
  }

  export function getSession(connection: string | URI): Promise<Session>;

  export function getVersion(): string;
}
