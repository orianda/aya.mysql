import {ValueDto} from "aya.mysql.querylizer";
import {List} from "./List";

export class Item<Id extends keyof Data, Data extends Record<string, ValueDto>> {

  constructor(
    public readonly list: List<Data>,
    public readonly id: Id
  ) {
  }

  has(id: Data[Id]): Promise<boolean> {
    return this.list
      .count({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  get(id: Data[Id]): Promise<Data> {
    return this.list
      .select(undefined, {[this.id]: id}, 1)
      .then((result) => result[0]);
  }

  set(id: Data[Id], data: Data): Promise<boolean> {
    return this.list
      .replace({...data, [this.id]: id})
      .then((result) => result > 0);
  }

  add(id: Data[Id], data: Data): Promise<boolean> {
    data[this.id] = id;
    return this.list
      .insert(data)
      .then((result) => result > 0);
  }

  mod(id: Data[Id], data: Data): Promise<boolean> {
    return this.list
      .update(data, {[this.id]: id}, 1)
      .then((amount) => amount > 0);
  }

  rid(id: Data[Id]): Promise<boolean> {
    return this.list
      .remove({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  append(data: Data, generate: (bounce: number) => Data[Id], bounces = 32): Promise<Data[Id]> {
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
