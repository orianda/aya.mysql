const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const {default: Item} = require('../dist/item');

chai.use(require('chai-as-promised'));

describe('append', () => {
  const data = {name: 'value'};
  let item;

  beforeEach(() => {
    item = new Item({}, 'id');
  });

  it('should append on first try', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.resolve(1));
    const promise = item.append(data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(1);
      expect(generate.calledOnce).to.equal(true);
      expect(generate.calledWith(32)).to.equal(true);
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.calledWith(result, data)).to.equal(true);
    });
  });

  it('should append on last try', () => {
    const generate = sinon.spy((generate) => generate);
    item.add = sinon.spy((id) => id ? Promise.reject({code: 'ER_DUP_ENTRY'}) : Promise.resolve(1));
    const promise = item.append(data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(0);
      expect(generate.callCount).to.equal(33);
      expect(generate.firstCall.args).to.deep.equal([32]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(33);
      expect(item.add.firstCall.args).to.deep.equal([32, data]);
      expect(item.add.lastCall.args).to.deep.equal([0, data]);
    });
  });

  it('should not append', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = item.append(data, generate);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result).to.be.instanceOf(Error);
      expect(result.message).to.equal('out of bounce');
      expect(generate.callCount).to.equal(33);
      expect(generate.firstCall.args).to.deep.equal([32]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(33);
    });
  });

  it('should have 3 attempts', () => {
    const generate = sinon.spy(() => 1);
    item.add = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
    const promise = item.append(data, generate, 3);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.rejected.then((result) => {
      expect(result).to.be.instanceOf(Error);
      expect(result.message).to.equal('out of bounce');
      expect(generate.callCount).to.equal(4);
      expect(generate.firstCall.args).to.deep.equal([3]);
      expect(generate.lastCall.args).to.deep.equal([0]);
      expect(item.add.callCount).to.equal(4);
    });
  });
});
