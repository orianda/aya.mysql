import {Inserting} from "./Inserting";
import {Query} from "./Query";
import {Result} from "./Result";

export interface CollectionAdd extends Inserting, Query {

  add(input: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>): this;

  execute(): Promise<Result>;
}
