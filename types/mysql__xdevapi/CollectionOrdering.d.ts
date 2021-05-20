export interface CollectionOrdering {

  sort(SortExprStr: ReadonlyArray<string>): this;

  sort(...SortExprStr: ReadonlyArray<string>): this;
}
