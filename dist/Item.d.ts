import { List } from "./List";
import { ValuesItemDto } from "aya.mysql.querylizer";
export declare class Item {
    private readonly list;
    readonly id: string;
    constructor(list: List, id: string);
    has(id: number | string): Promise<boolean>;
    get(id: number | string): Promise<ValuesItemDto>;
    set(id: number | string, data?: ValuesItemDto): Promise<number>;
    add(id: number | string | undefined, data?: ValuesItemDto): Promise<number | undefined>;
    mod(id: number | string, data?: ValuesItemDto): Promise<boolean>;
    rid(id: number | string): Promise<boolean>;
    append(data: ValuesItemDto, generate: GenerateDto, bounces?: number): Promise<string | number>;
}
export interface GenerateDto {
    (count: number): number | string;
}
