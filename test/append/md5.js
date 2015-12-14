'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    append = require('../../src/append/md5');

chai.use(require('chai-as-promised'));

describe('append', function () {
    var data = {name: 'value'},
        item = {};

    it('should append', function () {
        var promise;
        item.add = sinon.spy(function () {
            return Promise.resolve(1);
        });
        promise = append(item, data);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(result).to.be.string;
            expect(result.length).to.equal(32);
            expect(item.add.calledOnce).to.equal(true);
            expect(item.add.calledWith(result, data)).to.equal(true);
        });
    });

    it('should not append', function () {
        var error = new Error(),
            promise;
        item.add = sinon.spy(function () {
            return Promise.reject(error);
        });
        promise = append(item, data);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.rejected.then(function (result) {
            expect(result).to.equal(error);
            expect(item.add.calledOnce).to.equal(true);
            expect(item.add.args[0].length).to.equal(2);
            expect(item.add.args[0][0]).to.be.string;
            expect(item.add.args[0][0].length).to.equal(32);
            expect(item.add.args[0][1]).to.equal(data);
        });
    });

    it('should bounce 10 <default> times', function () {
        var promise;
        item.add = sinon.spy(function () {
            return Promise.reject({code: 'ER_DUP_ENTRY'});
        });
        promise = append(item, data);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.rejected.then(function (result) {
            expect(result.message).to.equal('out of bounce');
            expect(item.add.args.length).to.equal(32);
        });
    });

    it('should bounce 10 times', function () {
        var promise;
        item.add = sinon.spy(function () {
            return Promise.reject({code: 'ER_DUP_ENTRY'});
        });
        promise = append(item, data, 10);
        expect(promise).to.be.instanceOf(Promise);
        return expect(promise).to.eventually.be.rejected.then(function (result) {
            expect(result.message).to.equal('out of bounce');
            expect(item.add.args.length).to.equal(10);
        });
    });
});