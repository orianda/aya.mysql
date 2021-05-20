import {BaseResult} from "./BaseResult";
import {Column} from "./Column";
import {Row} from "./Row";

export interface RowResult extends BaseResult {

  fetchAll(): ReadonlyArray<ReadonlyArray<any>>;

  fetchOne(): ReadonlyArray<any>;

  getAffectedItemsCount(): number;

  getColumns(): ReadonlyArray<Column>;

  getResults(): ReadonlyArray<ReadonlyArray<Row>>;

  nextResult(): boolean;

  toArray(): ReadonlyArray<ReadonlyArray<ReadonlyArray<any>>>;
}

