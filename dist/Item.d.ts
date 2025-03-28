import { ValueDto } from 'aya.mysql.querylizer';
import { List } from './List';
export declare class Item<Id extends keyof Data, Data extends Record<string, ValueDto>> {
    readonly list: List<Data>;
    readonly id: Id;
    constructor(list: List<Data>, id: Id);
    has(id: Data[Id]): Promise<boolean>;
    get(id: Data[Id]): Promise<Data>;
    set(id: Data[Id], data: Data): Promise<boolean>;
    add(id: Data[Id], data: Data): Promise<boolean>;
    mod(id: Data[Id], data: Data): Promise<boolean>;
    rid(id: Data[Id]): Promise<boolean>;
    append(data: Data, generate: (bounce: number) => Data[Id], bounces?: number): Promise<Data[Id]>;
}
