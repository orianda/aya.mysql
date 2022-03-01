export interface DocResult {

  fetchAll(): ReadonlyArray<Record<string, unknown>>;

  fetchOne(): Record<string, unknown>;

  toArray(): ReadonlyArray<unknown>;
}
