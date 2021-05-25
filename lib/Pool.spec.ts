import mysql, {Session} from "@mysql/xdevapi";
import {expect} from "chai";
import sinon, {SinonSpy} from "sinon";
import {Pool} from "./Pool";
import {List} from "./List";
import {Item} from "./Item";

describe('Pool', () => {
  const session = {};
  let pool: Pool;

  beforeEach(() => {
    sinon
      .stub(mysql, 'getSession')
      .returns(Promise.resolve(session));
    pool = new Pool({
      host: 'host',
      port: 123456,
      user: 'user',
      password: 'password',
      schema: 'schema'
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a pool', () => {
    expect(pool).to.be.instanceOf(Pool);
  });

  it('should have pool property', () => {
    expect(pool.pool).to.be.a('function');
  });

  it('should create session', () => {
    return pool
      .pool()
      .then((issue: Session) => {
        expect(issue).to.equal(session);
      });
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
