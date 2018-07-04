const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(require('chai-as-promised'));

describe('pool', () => {
  const options = {};
  let getConnection, createPool, wrapper, callback;

  beforeEach(() => {
    getConnection = sinon.spy((cb) => {
      callback = cb;
    });
    createPool = sinon.spy(() => ({getConnection}));
    wrapper = proxyquire('../src/pool', {
      mysql: {createPool}
    });
  });

  it('should connect', () => {
    const pool = wrapper(options);
    const promise = pool();
    expect(createPool.calledOnce).to.equal(true);
    expect(createPool.calledWith(options)).to.equal(true);
    expect(getConnection.calledOnce).to.equal(true);
    expect(getConnection.calledWith(callback)).to.equal(true);
    expect(promise).to.be.instanceOf(Promise);
  });

  it('should reject', () => {
    const promise = wrapper(options)();
    const result = {};
    callback(result);
    return expect(promise).to.eventually.be.rejected.and.eventually.equal(result);
  });

  it('should resolve', () => {
    const promise = wrapper(options)();
    const result = {};
    callback(null, result);
    return expect(promise).to.eventually.be.fulfilled.and.eventually.equal(result).and.eventually.have
      .property('promisify');
  });
});