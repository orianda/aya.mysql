import mysql, {Client} from "@mysql/xdevapi";
import {expect} from "chai";
import sinon from "sinon";
import getPool from "./index";
import {PoolOptionsDto} from "./pool.dto";
import {LibPoolDto} from "./index.dto";
import List from "./List";
import Item from "./Item";

describe('pool', () => {
  let pool: LibPoolDto;

  beforeEach(() => {
    sinon.stub(mysql, 'getClient').returns({} as Client);
    pool = getPool({} as PoolOptionsDto);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    expect(pool).to.be.a('function');
  });

  it('should have list property', () => {
    expect(pool.list).to.be.a('function');
  });

  it('should create list', () => {
    const list = pool.list('table');
    expect(list).to.be.instanceOf(List);
  });

  it('should have item property', () => {
    const list = pool.list('table');
    expect(list.item).to.be.a('function');
  });

  it('should create item', () => {
    const list = pool.list('table');
    const item = list.item('id');
    expect(item).to.be.instanceOf(Item);
  });
});
