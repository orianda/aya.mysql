import {Query} from "./Query";
import {Inserting} from "./Inserting";
import {Result} from "./Result";

export interface TableInsert extends Query, Inserting {

  execute(): Promise<Result>;

  values(ExprOrLiteral: ReadonlyArray<string>): this;

  values(...ExprOrLiteral: ReadonlyArray<string>): this;
}
