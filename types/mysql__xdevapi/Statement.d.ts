import {Session} from "./Session";

export interface Statement {

  addArgs(args: ReadonlyArray<any>): this;

  getArgs(): ReadonlyArray<any>;

  getNamespace(): Namespace;

  getSQL(): string;

  getSession(): Session;
}

export enum Namespace {
  sql = 'sql',
  mysqlx = 'mysqlx'
}
