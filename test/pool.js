'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire');

chai.use(require('chai-as-promised'));

describe('pool', function () {
    var options = {},
        getConnection, createPool, wrapper, callback;

    beforeEach(function () {
        getConnection = sinon.spy(function (cb) {
            callback = cb;
        });
        createPool = sinon.spy(function () {
            return {
                getConnection: getConnection
            };
        });
        wrapper = proxyquire('../src/pool', {
            mysql: {
                createPool: createPool
            }
        });
    });

    it('should connect', function () {
        var pool = wrapper(options),
            promise = pool();
        expect(createPool.calledOnce).to.equal(true);
        expect(createPool.calledWith(options)).to.equal(true);
        expect(getConnection.calledOnce).to.equal(true);
        expect(getConnection.calledWith(callback)).to.equal(true);
        expect(promise).to.be.instanceOf(Promise);
    });

    it('should reject', function () {
        var promise = wrapper(options)(),
            result = {};
        callback(result);
        return expect(promise).to.eventually.be.rejected.and.eventually.equal(result);
    });

    it('should resolve', function () {
        var promise = wrapper(options)(),
            result = {};
        callback(null, result);
        return expect(promise).to.eventually.be.fulfilled.and.eventually.equal(result).and.eventually.have.property('promisify');
    });
});