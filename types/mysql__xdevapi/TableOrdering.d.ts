export interface TableOrdering {

  orderBy(SortExprStr: ReadonlyArray<string>): this;

  orderBy(...SortExprStr: ReadonlyArray<string>): this;
}
