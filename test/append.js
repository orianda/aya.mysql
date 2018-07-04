const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const append = require('../src/append');

chai.use(require('chai-as-promised'));

describe('append', () => {
  const data = {name: 'value'};
  const item = {};

  it('should append on first try', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.resolve(1));
    const promise = append(item, data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(1);
      expect(generate.calledOnce).to.equal(true);
      expect(generate.calledWith(31)).to.equal(true);
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.calledWith(result, data)).to.equal(true);
    });
  });

  it('should append on last try', () => {
    const generate = sinon.spy((generate) => generate);
    item.add = sinon.spy((id) => id ? Promise.reject({code: 'ER_DUP_ENTRY'}) : Promise.resolve(1));
    const promise = append(item, data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(0);
      expect(generate.callCount).to.equal(32);
      expect(generate.firstCall.args).to.deep.equal([31]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(32);
      expect(item.add.firstCall.args).to.deep.equal([31, data]);
      expect(item.add.lastCall.args).to.deep.equal([0, data]);
    });
  });

  it('should not append', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = append(item, data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result).to.deep.equal({
        message: 'out of bounce'
      });
      expect(generate.callCount).to.equal(32);
      expect(generate.firstCall.args).to.deep.equal([31]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(32);
    });
  });

  it('should have 3 attempts', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = append(item, data, generate, 3);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result).to.deep.equal({
        message: 'out of bounce'
      });
      expect(generate.callCount).to.equal(3);
      expect(generate.firstCall.args).to.deep.equal([2]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(3);
    });
  });
});