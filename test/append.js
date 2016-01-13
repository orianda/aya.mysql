'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    append = require('../src/append');

chai.use(require('chai-as-promised'));

describe('append', function () {
    var data = {name: 'value'},
        item = {};

    it('should append on first try', function () {
        var generate = sinon.spy(function () {
                return 1;
            }),
            promise;
        item.add = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = append(item, data, generate);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(1);
            expect(generate.calledOnce).to.equal(true);
            expect(generate.calledWith(31)).to.equal(true);
            expect(item.add.calledOnce).to.equal(true);
            expect(item.add.calledWith(result, data)).to.equal(true);
        });
    });

    it('should append on last try', function () {
        var generate = sinon.spy(function (generate) {
                return generate;
            }),
            promise;
        item.add = sinon.spy(function (id) {
            if (id) {
                return Promise.reject({
                    code: 'ER_DUP_ENTRY'
                });
            } else {
                return Promise.resolve(1);
            }
        });
        promise = append(item, data, generate);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.equal(0);
            expect(generate.callCount).to.equal(32);
            expect(generate.firstCall.args).to.deep.equal([31]);
            expect(generate.lastCall.args).to.deep.equal([0]);
            expect(item.add.callCount).to.equal(32);
            expect(item.add.firstCall.args).to.deep.equal([31, data]);
            expect(item.add.lastCall.args).to.deep.equal([0, data]);
        });
    });

    it('should not append', function () {
        var generate = sinon.spy(function () {
                return 1;
            }),
            promise;
        item.add = sinon.spy(function () {
            return Promise.reject({
                code: 'ER_DUP_ENTRY'
            });
        });
        promise = append(item, data, generate);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.rejected.then(function (result) {
            expect(result).to.deep.equal({
                message: 'out of bounce'
            });
            expect(generate.callCount).to.equal(32);
            expect(generate.firstCall.args).to.deep.equal([31]);
            expect(generate.lastCall.args).to.deep.equal([0]);
            expect(item.add.callCount).to.equal(32);
        });
    });

    it('should have 3 attempts', function () {
        var generate = sinon.spy(function () {
                return 1;
            }),
            promise;
        item.add = sinon.spy(function () {
            return Promise.reject({
                code: 'ER_DUP_ENTRY'
            });
        });
        promise = append(item, data, generate, 3);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.rejected.then(function (result) {
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