import {BaseResult} from "./BaseResult";

export interface Result extends BaseResult {

  getAffectedItemsCount(): number;

  getAffectedRowsCount(): number;

  getAutoIncrementValue(): number;

  getGeneratedIds(): ReadonlyArray<string>;
}
