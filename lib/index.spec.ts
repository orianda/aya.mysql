import {expect} from "chai";
import pool from ".";
import {List, Item} from ".";
import libPool from "./pool";
import libList from "./List";
import libItem from "./Item";

describe('pool', () => {
  const srv: {
    [name: string]: any;
  } = {pool,List,Item};
  const lib: {
    [name: string]: any;
  } = {
    pool:libPool,
    List:libList,
    Item:libItem
  };

  Object
    .keys(srv)
    .forEach((name) => {

      it(`should have ${name}`, () => {
        expect(srv[name]).to.equal(lib[name]);
      });
    });
});
