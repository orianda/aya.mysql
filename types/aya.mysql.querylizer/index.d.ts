declare module 'aya.mysql.querylizer' {

  export function names(names?: Names = []): string;

  export function where(where?: Where = {}): string;

  export function order(order?: Order = []): string;

  export function limit(amount?: Amount = 0, offset?: Offset = 0): string;

  export function values(values?: Values = {}): string;

  export type Names = ReadonlyArray<string>;

  export interface Where {
    [name: string]: any;
  }

  export type Amount = number;

  export type Offset = number;

  export type Order = ReadonlyArray<string>;

  export interface Values {
    [name: string]: boolean | string | number | null | undefined;
  }
}
