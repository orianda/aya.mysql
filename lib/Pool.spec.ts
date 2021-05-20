import mysql, {Client, Session} from "@mysql/xdevapi";
import {expect} from "chai";
import sinon, {SinonSpy} from "sinon";
import {Pool} from "./Pool";
import {List} from "./List";
import {Item} from "./Item";

describe('pool', () => {
  const session = {};
  let pool: Pool;

  beforeEach(() => {
    sinon
      .stub(mysql, 'getClient')
      .returns({
        getSession: () => Promise.resolve(session)
      } as Client);
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

  it('should get client', () => {
    expect((mysql.getClient as SinonSpy).getCall(0).args[0]).to.deep.equal({
      host: 'host',
      port: 123456,
      user: 'user',
      password: 'password'
    });
  });
});
