export interface Row {
  getColumnMetadata(): ReadonlyArray<ColMetadata>;

  setColumnMetadata(metadata: ReadonlyArray<ColMetadata>): this;

  toArray(): ReadonlyArray<any>;

  toJSON(): RowJSON;

  valueOf(): RowValue;
}

export interface ColMetadata {

  valueOf(): ColMetadataValue;

  getAlias(): string;

  getCatalog(): string;

  getCharset(): string | undefined;

  getCollation(): string | undefined;

  getContentType(): string | undefined;

  getFractionalDigits(): number;

  getLength(): number;

  getName(): string;

  getSchema(): string;

  getTableAlias(): string;

  getTableName(): string;

  getType(): ColMetadataType | undefined;

  getTypeId(): number;

  getTypeString(): any;

  isBinary(): boolean;

  isFlagged(): boolean;

  isJSON(): boolean;

  isSigned(): boolean;

  toJSON(): ColMetadataJSON;
}

export interface ColMetadataValue {
  array: ReadonlyArray<any>;
}

export enum ColMetadataType {
  SINT = 'SINT',
  UINT = 'UINT',
  DOUBLE = 'DOUBLE',
  FLOAT = 'FLOAT',
  BYTES = 'BYTES',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  SET = 'SET',
  ENUM = 'ENUM',
  BIT = 'BIT',
  DECIMAL = 'DECIMAL',
  STRING = 'STRING',
}

export interface ColMetadataJSON {
  type: ColMetadataType | undefined;
  name: string;
  original_name: string;
  table: string;
  original_table: string;
  schema: string;
  catalog: string;
  collation: string | undefined;
  fractional_digits: number;
  length: number;
  flags: number;
  content_type: string | undefined;
}

export interface RowJSON {
  fields: ReadonlyArray<any>;
}

export interface RowValue {
  array: ReadonlyArray<ReadonlyArray<[Uint8Array]>>;
}
