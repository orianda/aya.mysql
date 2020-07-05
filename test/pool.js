const mysql = require('@mysql/xdevapi');
const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const getPool = require('../src/pool');

chai.use(require('chai-as-promised'));

describe('pool', () => {
  const options = {some: 'option'};
  let getSession, sessionPromise;

  beforeEach(() => {
    getSession = sinon.spy(() => sessionPromise);
    sinon.stub(mysql, 'getClient').returns({getSession});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should connect', () => {
    sessionPromise = Promise.resolve();
    const pool = getPool(options);
    const promise = pool();
    expect(mysql.getClient.calledOnce).to.equal(true);
    expect(mysql.getClient.getCall(0).args[0].some).to.equal('option');
    expect(getSession.calledOnce).to.equal(true);
    expect(getSession.calledWith()).to.equal(true);
    expect(promise).to.equal(sessionPromise);
  });

  it('should reject', () => {
    const error = new Error();
    sessionPromise = Promise.reject(error);
    const promise = getPool(options)();
    return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
  });

  it('should resolve', () => {
    const session = {};
    sessionPromise = Promise.resolve(session);
    const promise = getPool(options)();
    return expect(promise).to.eventually.be.fulfilled.and.eventually.equal(session);
  });
});
