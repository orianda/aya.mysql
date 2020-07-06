declare module '@mysql/xdevapi' {

  export function getClient(options: Options): Client;

  export interface Options {
    host: string;
    port: number;
    user: string;
    password: string;
    schema: string;
    pooling?: {
      enabled?: boolean;
      maxSize?: number;
      maxIdleTime?: number;
      queueTimeout: number;
    }
  }

  export interface Client {
    getSession(): Promise<Session>;
  }

  export interface Session {
    sql(query: string): Statement;

    close(): void;
  }

  export interface Statement {
    execute(): Promise<Result>;
  }

  export interface Result {
    toArray(): ReadonlyArray<ReadonlyArray<ReadonlyArray<any>>>;

    getColumns(): ReadonlyArray<Col>;

    getResults(): ReadonlyArray<ReadonlyArray<Row>>;

    getAutoIncrementValue(): number;

    getAffectedItemsCount(): number;
  }

  export interface Col {
    getColumnName(): string;
  }

  export type Row = ReadonlyArray<any>;
}
