import {DatabaseObject} from "./DatabaseObject";
import {Collection} from "./Collection";
import {Table} from "./Table";

export interface Schema extends DatabaseObject {

  createCollection(name: string, options?: CreateCollectionOptions): Collection;

  dropCollection(name: string): Promise<boolean>;

  existsInDatabase(): Promise<boolean>;

  getCollection(name: string): Collection;

  getCollectionAsTable(name: string): Table;

  getCollections(): Promise<ReadonlyArray<Collection>>;

  getName(): string;

  getTable(name: string): Table;

  getTables(): Promise<ReadonlyArray<Table>>;

  inspect(): SchemaMetadata;

  modifyCollection(name: string, options?: ModifyCollectionOptions): Promise<Collection>;
}

export interface CreateCollectionOptions {
  reuseExisting?: boolean;
  validation?: SchemaValidationOptions;
}

export interface SchemaValidationOptions {
  schema?: Record<string, any>;
  level?: ValidationLevel;
}

export enum ValidationLevel {
  OFF = 'OFF',
  STRICT = 'STRICT'
}

export interface SchemaMetadata {
  name: string;
}

export interface ModifyCollectionOptions {
  validation?: SchemaValidationOptions;
}
