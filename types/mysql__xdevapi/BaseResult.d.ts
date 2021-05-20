import {Warning} from "./Warning";

export interface BaseResult {

  getWarnings(): ReadonlyArray<Warning>;

  getWarningsCount(): number;
}
