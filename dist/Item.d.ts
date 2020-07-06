import List from "./List";
import { RowDto } from "./List.dto";
import { GenerateDto } from "./Item.dto";
export default class Item {
    list: List;
    id: string;
    constructor(list: List, id: string);
    has(id: number | string): Promise<boolean>;
    get(id: number | string): Promise<RowDto>;
    set(id: number | string, data?: RowDto): Promise<number | undefined>;
    add(id: number | string | undefined, data?: RowDto): Promise<number | undefined>;
    mod(id: number | string, data?: RowDto): Promise<boolean>;
    rid(id: number | string): Promise<boolean>;
    append(data: RowDto, generate: GenerateDto, bounces?: number): Promise<string | number>;
}
