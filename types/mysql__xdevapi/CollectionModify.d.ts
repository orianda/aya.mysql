import {Binding} from "./Binding";
import {Limiting} from "./Limiting";
import {CollectionOrdering} from "./CollectionOrdering";
import {Query} from "./Query";
import {Updating} from "./Updating";
import {Result} from "./Result";

export interface CollectionModify extends Binding, Limiting, CollectionOrdering, Query, Updating {

  arrayAppend(field: string, unknown: unknown): this;

  arrayDelete(field: string): this;

  arrayInsert(field: string, unknown: unknown): this;

  execute(): Result;

  patch(properties: Record<string, unknown>): this;

  set(field: string, unknown: unknown): this;

  unset(fields: ReadonlyArray<string>): this;

  unset(...fields: ReadonlyArray<string>): this;
}
