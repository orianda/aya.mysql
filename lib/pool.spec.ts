// import mysql, {Session} from "@mysql/xdevapi";
// import {expect} from "chai";
// import sinon, {SinonSpy} from "sinon";
// import getPool from "./pool";
// import {PoolOptionsDto} from "./pool.dto";
//
// describe('pool', () => {
//   const options = {some: 'option'} as any as PoolOptionsDto;
//   let getSession: SinonSpy;
//   let sessionPromise: Promise<Session>;
//
//   beforeEach(() => {
//     getSession = sinon.spy(() => sessionPromise);
//     sinon.stub(mysql, 'getClient').returns({getSession});
//   });
//
//   afterEach(() => {
//     sinon.restore();
//   });
//
//   it('should connect', () => {
//     sessionPromise = Promise.resolve({} as Session);
//     const pool = getPool(options);
//     const promise = pool();
//     expect((mysql.getClient as SinonSpy).calledOnce).to.equal(true);
//     expect((mysql.getClient as SinonSpy).getCall(0).args[0].some).to.equal('option');
//     expect(getSession.calledOnce).to.equal(true);
//     expect(getSession.calledWith()).to.equal(true);
//     expect(promise).to.equal(sessionPromise);
//   });
//
//   it('should reject', () => {
//     const error = new Error();
//     sessionPromise = Promise.reject(error);
//     return getPool(options)().then(() => {
//       expect(false).to.equal(true);
//     }, (issue) => {
//       expect(issue).to.equal(error);
//     });
//   });
//
//   it('should resolve', () => {
//     const session = {} as Session;
//     sessionPromise = Promise.resolve(session);
//     return getPool(options)().then((issue) => {
//       expect(issue).to.equal(session);
//     });
//   });
// });


import mysql, {Client} from "@mysql/xdevapi";
import {expect} from "chai";
import sinon from "sinon";
import getPool from "./pool";
import {PoolDto, PoolOptionsDto} from "./pool.dto";
import List from "./List";
import Item from "./Item";

describe('pool', () => {
  const session = {};
  let pool: PoolDto;

  beforeEach(() => {
    sinon.stub(mysql, 'getClient').returns({
      getSession: () => Promise.resolve(session)
    } as Client);
    pool = getPool({} as PoolOptionsDto);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    expect(pool).to.be.a('function');
  });

  it('should create session', () => {
    return pool().then((issue) => {
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
