export interface Grouping {

  groupBy(GroupByExprStr: ReadonlyArray<string>): this;

  groupBy(...GroupByExprStr: ReadonlyArray<string>): this;

  having(expr: string): this;
}
