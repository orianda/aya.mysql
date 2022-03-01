import {RowResult} from "./RowResult";

export interface SqlResult extends RowResult {

  getAutoIncrementValue(): number;

  hasData(): boolean,

  toArray(): ReadonlyArray<ReadonlyArray<ReadonlyArray<unknown>>>;
}
