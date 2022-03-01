import {BaseResult} from "./BaseResult";
import {Column} from "./Column";
import {Row} from "./Row";

export interface RowResult extends BaseResult {

  fetchAll(): ReadonlyArray<ReadonlyArray<unknown>>;

  fetchOne(): ReadonlyArray<unknown>;

  getAffectedItemsCount(): number;

  getColumns(): ReadonlyArray<Column>;

  getResults(): ReadonlyArray<ReadonlyArray<Row>>;

  nextResult(): boolean;

  toArray(): ReadonlyArray<ReadonlyArray<ReadonlyArray<unknown>>>;
}

