import List from "./List";
import {RowDto} from "./List.dto";
import {GenerateDto} from "./Item.dto";

export default class Item {

  list: List;
  id: string;

  constructor(list: List, id: string) {
    this.list = list;
    this.id = id;
  }

  has(id: number | string): Promise<boolean> {
    return this.list
      .count({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  get(id: number | string): Promise<RowDto> {
    return this.list
      .select(undefined, {[this.id]: id}, 1)
      .then((result) => result[0]);
  }

  set(id: number | string, data?: RowDto): Promise<number | undefined> {
    return this
      .rid(id)
      .then(() => this.add(id, data));
  }

  add(id: number | string | undefined, data: RowDto = {}): Promise<number | undefined> {
    data[this.id] = id;
    return this.list
      .insert(data);
  }

  mod(id: number | string, data?: RowDto): Promise<boolean> {
    return this.list
      .update(data, {[this.id]: id}, 1)
      .then((amount) => amount > 0);
  }

  rid(id: number | string): Promise<boolean> {
    return this.list
      .remove({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  append(data: RowDto, generate: GenerateDto, bounces: number = 32): Promise<string | number> {
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
