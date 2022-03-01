import {Session} from "./Session";

export interface Statement {

  addArgs(args: ReadonlyArray<unknown>): this;

  getArgs(): ReadonlyArray<unknown>;

  getNamespace(): Namespace;

  getSQL(): string;

  getSession(): Session;
}

export enum Namespace {
  sql = 'sql',
  mysqlx = 'mysqlx'
}
