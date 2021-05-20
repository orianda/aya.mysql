export interface DocResult {

  fetchAll(): ReadonlyArray<Record<string, any>>;

  fetchOne(): Record<string, any>;

  toArray(): ReadonlyArray<any>;
}
