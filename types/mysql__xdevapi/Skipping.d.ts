import {Limiting} from "./Limiting";

export interface Skipping extends Limiting {

  offset(value: number): this;
}
