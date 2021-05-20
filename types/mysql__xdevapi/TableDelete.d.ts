import {Binding} from "./Binding";
import {Limiting} from "./Limiting";
import {Query} from "./Query";
import {TableOrdering} from "./TableOrdering";
import {Result} from "./Result";

export interface TableDelete extends Binding, Limiting, Query, TableOrdering {

  execute(): Promise<Result>;
}
