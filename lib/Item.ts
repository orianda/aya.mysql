import {List} from "./List";
import {ValuesItemDto} from "aya.mysql.querylizer";

export class Item {

  constructor(
    private readonly list: List,
    public readonly id: string
  ) {
  }

  has(id: number | string): Promise<boolean> {
    return this.list
      .count({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  get(id: number | string): Promise<ValuesItemDto> {
    return this.list
      .select(undefined, {[this.id]: id}, 1)
      .then((result) => result[0]);
  }

  set(id: number | string, data?: ValuesItemDto): Promise<number> {
    return this.list.replace({...data, [this.id]: id});
  }

  add(id: number | string | undefined, data: ValuesItemDto = {}): Promise<number | undefined> {
    data[this.id] = id;
    return this.list
      .insert(data);
  }

  mod(id: number | string, data?: ValuesItemDto): Promise<boolean> {
    return this.list
      .update(data, {[this.id]: id}, 1)
      .then((amount) => amount > 0);
  }

  rid(id: number | string): Promise<boolean> {
    return this.list
      .remove({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  append(data: ValuesItemDto, generate: GenerateDto, bounces: number = 32): Promise<string | number> {
    const id = generate(bounces);
    return this
      .add(id, data)
      .then(() => id, (error) => {
        if (error?.code !== 'ER_DUP_ENTRY') {
          return Promise.reject(error);
        } else if (bounces > 0) {
          return this.append(data, generate, bounces - 1);
        } else {
          const error = new Error('out of bounce');
          return Promise.reject(error);
        }
      });
  }
}

export interface GenerateDto {
  (count: number): number | string;
}
