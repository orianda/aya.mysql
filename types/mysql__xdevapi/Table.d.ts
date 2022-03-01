import {DatabaseObject} from "./DatabaseObject";
import {Schema} from "./Schema";
import {TableDelete} from "./TableDelete";
import {TableInsert} from "./TableInsert";
import {TableSelect} from "./TableSelect";
import {TableUpdate} from "./TableUpdate";

export interface Table extends DatabaseObject {

  count(): number;

  delete(expr?: string): TableDelete;

  existsInDatabase(): Promise<boolean>;

  getName(): string;

  getSchema(): Schema;

  insert(fields: ReadonlyArray<string> | Record<string, unknown>): TableInsert;

  insert(...fields: ReadonlyArray<string>): TableInsert;

  inspect(): Record<string, unknown>;

  isView(): Promise<boolean>;

  select(expr?: string | ReadonlyArray<string>): TableSelect;

  update(expr?: string): TableUpdate;
}
