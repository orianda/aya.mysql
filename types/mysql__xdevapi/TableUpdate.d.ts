import {Binding} from "./Binding";
import {Limiting} from "./Limiting";
import {Query} from "./Query";
import {TableOrdering} from "./TableOrdering";
import {Updating} from "./Updating";
import {Result} from "./Result";

export interface TableUpdate extends Binding, Limiting, Query, TableOrdering, Updating {

  execute(): Promise<Result>;

  set(field: string, expr: string): this;
}
