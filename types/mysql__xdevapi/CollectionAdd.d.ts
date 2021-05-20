import {Inserting} from "./Inserting";
import {Query} from "./Query";
import {Result} from "./Result";

export interface CollectionAdd extends Inserting, Query {

  add(input: Record<string, any> | ReadonlyArray<Record<string, any>>): this;

  execute(): Promise<Result>;
}
