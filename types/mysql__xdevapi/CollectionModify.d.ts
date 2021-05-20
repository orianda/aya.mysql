import {Binding} from "./Binding";
import {Limiting} from "./Limiting";
import {CollectionOrdering} from "./CollectionOrdering";
import {Query} from "./Query";
import {Updating} from "./Updating";
import {Result} from "./Result";

export interface CollectionModify extends Binding, Limiting, CollectionOrdering, Query, Updating {

  arrayAppend(field: string, any: any): this;

  arrayDelete(field: string): this;

  arrayInsert(field: string, any: any): this;

  execute(): Result;

  patch(properties: Record<string, any>): this;

  set(field: string, any: any): this;

  unset(fields: ReadonlyArray<string>): this;

  unset(...fields: ReadonlyArray<string>): this;
}
