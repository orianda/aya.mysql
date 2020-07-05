const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const Item = require('../src/item');

chai.use(require('chai-as-promised'));

describe('item', () => {
  const list = {};
  let item;

  beforeEach(() => {
    list.count = sinon.spy();
    list.select = sinon.spy();
    list.insert = sinon.spy();
    list.update = sinon.spy();
    list.remove = sinon.spy();
    item = new Item(list, 'id');
  });

  it('should exist', () => {
    list.count = sinon.spy(() => Promise.resolve(1));
    const promise = item.has(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(true);
      expect(list.count.calledOnce).to.equal(true);
      expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
    });
  });

  it('should not exist', () => {
    list.count = sinon.spy(() => Promise.resolve(0));
    const promise = item.has(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(false);
      expect(list.count.calledOnce).to.equal(true);
      expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
    });
  });

  it('should select', () => {
    const entry = {};
    list.select = sinon.spy(() => Promise.resolve([entry]));
    const promise = item.get(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(entry);
      expect(list.select.calledOnce).to.equal(true);
      expect(list.select.calledWith(null, {id: 123}, 1)).to.equal(true);
    });
  });

  it('should not select', () => {
    list.select = sinon.spy(() => Promise.resolve([]));
    const promise = item.get(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(undefined);
      expect(list.select.calledOnce).to.equal(true);
      expect(list.select.calledWith(null, {id: 123}, 1)).to.equal(true);
    });
  });

  it('should update', () => {
    const data = {};
    list.update = sinon.spy(() => Promise.resolve(1));
    const promise = item.mod(123, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(true);
      expect(list.update.calledOnce).to.equal(true);
      expect(list.update.calledWith(data, {id: 123}, 1)).to.equal(true);
    });
  });

  it('should not update', () => {
    const data = {};
    list.update = sinon.spy(() => Promise.resolve(0));
    const promise = item.mod(123, data);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(false);
      expect(list.update.calledOnce).to.equal(true);
      expect(list.update.calledWith(data, {id: 123}, 1)).to.equal(true);
    });
  });

  it('should replace', () => {
    item.rid = sinon.spy(() => Promise.resolve());
    item.add = sinon.spy(() => Promise.resolve(true));
    const promise = item.set(123, {name: 'value'});
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(true);
      expect(item.rid.calledOnce).to.equal(true);
      expect(item.rid.calledWith(123)).to.equal(true);
      expect(item.add.calledOnce).to.equal(true);
      expect(item.add.calledWith(123, {name: 'value'})).to.equal(true);
    });
  });

  it('should insert', () => {
    list.insert = sinon.spy(() => Promise.resolve(1));
    const promise = item.add(123, {name: 'value'});
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(true);
      expect(list.insert.calledOnce).to.equal(true);
      expect(list.insert.calledWith({name: 'value', id: 123})).to.equal(true);
    });
  });

  it('should not insert', () => {
    list.insert = sinon.spy(() => Promise.resolve(0));
    const promise = item.add(123, {name: 'value'});
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(false);
      expect(list.insert.calledOnce).to.equal(true);
      expect(list.insert.calledWith({name: 'value', id: 123})).to.equal(true);
    });
  });

  it('should remove', () => {
    list.remove = sinon.spy(() => Promise.resolve(1));
    const promise = item.rid(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(true);
      expect(list.remove.calledOnce).to.equal(true);
      expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
    });
  });

  it('should not remove', () => {
    list.remove = sinon.spy(() => Promise.resolve(0));
    const promise = item.rid(123);
    expect(promise).to.be.instanceOf(Promise);
    return expect(promise).to.eventually.be.fulfilled.then((result) => {
      expect(result).to.equal(false);
      expect(list.remove.calledOnce).to.equal(true);
      expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
    });
  });
});
