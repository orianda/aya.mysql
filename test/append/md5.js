const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const append = require('../../src/append/md5');

chai.use(require('chai-as-promised'));

describe('append md5', () => {
  const data = {name: 'value'};
  const item = {};

  it('should append', () => {
    item.add = sinon.spy(() => Promise.resolve(1));
    const promise = append(item, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.be.a('string');
      expect(result.length).to.equal(32);
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.calledWith(result, data)).to.equal(true);
    });
  });

  it('should not append', () => {
    const error = new Error();
    item.add = sinon.spy(() => Promise.reject(error));
    const promise = append(item, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result).to.equal(error);
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.args[0].length).to.equal(2);
      expect(item.add.args[0][0]).to.be.a('string');
      expect(item.add.args[0][0].length).to.equal(32);
      expect(item.add.args[0][1]).to.equal(data);
    });
  });

  it('should have no id', () => {
    item.add = sinon.spy(() => Promise.resolve(0));
    const promise = append(item, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.be.an('undefined');
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.args[0].length).to.equal(2);
      expect(item.add.args[0][0]).to.be.a('string');
      expect(item.add.args[0][0].length).to.equal(32);
      expect(item.add.args[0][1]).to.equal(data);
    });
  });

  it('should bounce 10 <default> times', () => {
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = append(item, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result.message).to.equal('out of bounce');
      expect(item.add.args.length).to.equal(32);
    });
  });

  it('should bounce 10 times', () => {
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = append(item, data, 10);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result.message).to.equal('out of bounce');
      expect(item.add.args.length).to.equal(10);
    });
  });
});
