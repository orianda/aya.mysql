import {Binding} from "./Binding";
import {Limiting} from "./Limiting";
import {CollectionOrdering} from "./CollectionOrdering";
import {Query} from "./Query";
import {Result} from "./Result";

export interface CollectionRemove extends Binding, Limiting, CollectionOrdering, Query {

  execute(): Promise<Result>;
}
