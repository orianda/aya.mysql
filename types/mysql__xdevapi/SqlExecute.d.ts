import {Statement} from "./Statement";
import {SqlResult} from "./SqlResult";
import {RowCursor} from "./RowCursor";
import {MetadataCursor} from "./MetadataCursor";

export interface SqlExecute extends Statement {

  execute(rowcb: RowCursor, metacb?: MetadataCursor): SqlResult;

  bind(values: ReadonlyArray<string>): this;

  bind(...values: ReadonlyArray<string>): this;
}
