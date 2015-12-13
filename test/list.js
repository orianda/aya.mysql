'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    List = require('../src/list');

chai.use(require('chai-as-promised'));

describe('list', function () {
    var output, promisify, release, mysql, list;

    beforeEach(function () {
        promisify = sinon.spy(function () {
            return Promise.resolve(output);
        });
        release = sinon.spy();
        mysql = sinon.spy(function () {
            return Promise.resolve({
                promisify: promisify,
                release: release
            });
        });
        list = new List(mysql, 'table');
    });

    it('should count', function () {
        var promise;
        output = [{amount: 0}];
        promise = list.count();
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'SELECT COUNT(*) AS `amount` FROM `table`  ', [])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(0);
        });
    });

    it('should count partial', function () {
        var promise;
        output = [{amount: 0}];
        promise = list.count({name: 'value'}, 10, 5);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'SELECT COUNT(*) AS `amount` FROM `table` WHERE `name` = ? LIMIT 5, 10', ['value'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(0);
        });
    });

    it('should select', function () {
        var promise = list.select();
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'SELECT * FROM `table`   ', [])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(output);
        });
    });

    it('should select partial', function () {
        var promise = list.select(['name'], {name: 'value'}, 10, 5, ['name']);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'SELECT `name` FROM `table` WHERE `name` = ? ORDER BY `name` ASC LIMIT 5, 10', ['value'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(output);
        });
    });

    it('should insert', function () {
        var promise;
        output = {affectedRows: 1};
        promise = list.insert({name: 'value'});
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'INSERT INTO `table` SET `name` = ?', ['value'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(1);
        });
    });

    it('should insert nothing', function () {
        var promise = list.insert({});
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.called).to.equal(false);
            expect(promisify.called).to.equal(false);
            expect(release.called).to.equal(false);
            expect(result).to.equal(0);
        });
    });

    it('should update', function () {
        var promise;
        output = {affectedRows: 1};
        promise = list.update({name: 'value'});
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'UPDATE `table` SET `name` = ?   ', ['value'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(1);
        });
    });

    it('should update partial', function () {
        var promise;
        output = {affectedRows: 1};
        promise = list.update({name: 'value'}, {name: 'equal'}, 10, 5, ['name']);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'UPDATE `table` SET `name` = ? WHERE `name` = ? ORDER BY `name` ASC LIMIT 5, 10', ['value', 'equal'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(1);
        });
    });

    it('should update nothing', function () {
        var promise = list.update({});
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.called).to.equal(false);
            expect(promisify.called).to.equal(false);
            expect(release.called).to.equal(false);
            expect(result).to.equal(0);
        });
    });

    it('should remove', function () {
        var promise;
        output = {affectedRows: 1};
        promise = list.remove();
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'DELETE FROM `table`   ', [])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(1);
        });
    });

    it('should remove partial', function () {
        var promise;
        output = {affectedRows: 1};
        promise = list.remove({name: 'value'}, 10, 5, ['name']);
        return expect(promise).to.eventually.be.fulfilled.then(function (result) {
            expect(mysql.calledOnce).to.equal(true);
            expect(mysql.calledWith()).to.equal(true);
            expect(promisify.calledOnce).to.equal(true);
            expect(promisify.calledWith('query', 'DELETE FROM `table` WHERE `name` = ? ORDER BY `name` ASC LIMIT 5, 10', ['value'])).to.equal(true);
            expect(release.calledOnce).to.equal(true);
            expect(release.calledWith()).to.equal(true);
            expect(result).to.equal(1);
        });
    });
});