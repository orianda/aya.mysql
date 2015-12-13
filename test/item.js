'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    Item = require('../src/item');

chai.use(require('chai-as-promised'));

describe('item', function () {
    var list = {},
        item;

    beforeEach(function () {
        list.count = sinon.spy();
        list.select = sinon.spy();
        list.insert = sinon.spy();
        list.update = sinon.spy();
        list.remove = sinon.spy();
        item = new Item(list, 'id');
    });

    it('should exist', function () {
        var promise;
        list.count = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = item.has(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(true);
            expect(list.count.calledOnce).to.equal(true);
            expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
        });
    });

    it('should not exist', function () {
        var promise;
        list.count = sinon.spy(function () {
            return Promise.resolve(0);
        });
        promise = item.has(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(false);
            expect(list.count.calledOnce).to.equal(true);
            expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
        });
    });

    it('should select', function () {
        var entry = {},
            promise;
        list.select = sinon.spy(function () {
            return Promise.resolve([entry]);
        });
        promise = item.get(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(entry);
            expect(list.select.calledOnce).to.equal(true);
            expect(list.select.calledWith({id: 123}, 1)).to.equal(true);
        });
    });

    it('should not select', function () {
        var promise;
        list.select = sinon.spy(function () {
            return Promise.resolve([]);
        });
        promise = item.get(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(undefined);
            expect(list.select.calledOnce).to.equal(true);
            expect(list.select.calledWith({id: 123}, 1)).to.equal(true);
        });
    });

    it('should update', function () {
        var data = {},
            promise;
        list.update = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = item.mod(123, data);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(true);
            expect(list.update.calledOnce).to.equal(true);
            expect(list.update.calledWith(data, {id: 123}, 1)).to.equal(true);
        });
    });

    it('should not update', function () {
        var data = {},
            promise;
        list.update = sinon.spy(function () {
            return Promise.resolve(0);
        });
        promise = item.mod(123, data);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(false);
            expect(list.update.calledOnce).to.equal(true);
            expect(list.update.calledWith(data, {id: 123}, 1)).to.equal(true);
        });
    });

    it('should replace', function () {
        var promise;
        item.rid = sinon.spy(function () {
            return Promise.resolve();
        });
        item.add = sinon.spy(function () {
            return Promise.resolve(true);
        });
        promise = item.set(123, {name: 'value'});
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(true);
            expect(item.rid.calledOnce).to.equal(true);
            expect(item.rid.calledWith(123)).to.equal(true);
            expect(item.add.calledOnce).to.equal(true);
            expect(item.add.calledWith(123, {name: 'value'})).to.equal(true);
        });
    });

    it('should insert', function () {
        var promise;
        list.insert = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = item.add(123, {name: 'value'});
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(true);
            expect(list.insert.calledOnce).to.equal(true);
            expect(list.insert.calledWith({name: 'value', id: 123})).to.equal(true);
        });
    });

    it('should not insert', function () {
        var promise;
        list.insert = sinon.spy(function () {
            return Promise.resolve(0);
        });
        promise = item.add(123, {name: 'value'});
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(false);
            expect(list.insert.calledOnce).to.equal(true);
            expect(list.insert.calledWith({name: 'value', id: 123})).to.equal(true);
        });
    });

    it('should remove', function () {
        var promise;
        list.remove = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = item.rid(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(true);
            expect(list.remove.calledOnce).to.equal(true);
            expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
        });
    });

    it('should not remove', function () {
        var promise;
        list.remove = sinon.spy(function () {
            return Promise.resolve(0);
        });
        promise = item.rid(123);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(false);
            expect(list.remove.calledOnce).to.equal(true);
            expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
        });
    });
});