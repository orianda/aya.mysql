import {DatabaseObject} from "./DatabaseObject";
import {CollectionAdd} from "./CollectionAdd";
import {Result} from "./Result";
import {Schema} from "./Schema";
import {CollectionRemove} from "./CollectionRemove";
import {CollectionFind} from "./CollectionFind";
import {CollectionModify} from "./CollectionModify";

export interface Collection extends DatabaseObject {

  add(expr: string | Record<string, any> | ReadonlyArray<string | Record<string, any>>): CollectionAdd;

  addOrReplaceOne(id: string, data: Record<string, any>): Promise<Result>;

  count(): Promise<number>;

  createIndex(name: string, constraint: IndexDefinition): Promise<boolean>;

  dropIndex(name: string): Promise<boolean>;

  existsInDatabase(): Promise<boolean>;

  find(expr: string): CollectionFind;

  getOne(id: string): Record<string, any>;

  getSchema(): Schema;

  inspect(): Record<string, any>;

  modify(expr: string): CollectionModify;

  remove(expr: string): CollectionRemove;

  removeOne(id: string): Result;

  replaceOne(id: string, data: Record<string, any>): Result;
}

export interface IndexDefinition {
  type?: IndexDefinitionType;
  fields: ReadonlyArray<FieldDefinition>;
}

export enum IndexDefinitionType {
  INDEX = 'INDEX',
  SPATIAL = 'SPATIAL'
}

export interface FieldDefinition {
  field: string;
  type: IndexDefinitionType;
  required?: boolean;
  options?: number;
  srid?: number;
}
