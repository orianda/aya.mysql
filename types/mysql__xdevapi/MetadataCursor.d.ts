export interface MetadataCursor {
  (metadata: ReadonlyArray<Record<string, any>>): void;
}
