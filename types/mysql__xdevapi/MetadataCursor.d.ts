export interface MetadataCursor {
  (metadata: ReadonlyArray<Record<string, unknown>>): void;
}
