import {expect} from "chai";
import {Item, List, Pool} from ".";
import {Pool as PoolLib} from "./Pool";
import {List as ListLib} from "./List";
import {Item as ItemLib} from "./Item";

describe('index', () => {
  const srv: Record<string, unknown> = {Pool, List, Item};
  const lib: Record<string, unknown> = {
    Pool: PoolLib,
    List: ListLib,
    Item: ItemLib
  };

  Object
    .keys(srv)
    .forEach((name) => {

      it(`should have ${name}`, () => {
        expect(srv[name]).to.equal(lib[name]);
      });
    });
});
