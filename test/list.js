const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const List = require('../src/list');

chai.use(require('chai-as-promised'));

describe('list', () => {

  describe('success case', () => {
    let output, promisify, release, mysql, list;

    beforeEach(() => {
      promisify = sinon.spy(() => Promise.resolve(output));
      release = sinon.spy();
      mysql = sinon.spy(() => Promise.resolve({promisify, release}));
      list = new List(mysql, 'table');
    });

    it('should count', () => {
      output = [{amount: 0}];
      const promise = list.count();
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith('query', 'SELECT COUNT(*) AS `amount` FROM `table`  ')).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(0);
      });
    });

    it('should count partial', () => {
      output = [{amount: 0}];
      const promise = list.count({name: 'value'}, 10, 5);
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith(
          'query',
          'SELECT COUNT(*) AS `amount` FROM `table` WHERE `name` = "value" LIMIT 5, 10'
        )).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(0);
      });
    });

    it('should select', () => {
      const promise = list.select();
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith('query', 'SELECT * FROM `table`   ')).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(output);
      });
    });

    it('should select partial', () => {
      const promise = list.select(['name'], {name: 'value'}, 10, 5, ['name']);
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith(
          'query',
          'SELECT `name` FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10'
        )).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(output);
      });
    });

    it('should insert', () => {
      output = {affectedRows: 1};
      const promise = list.insert({name: 'value'});
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith('query', 'INSERT INTO `table` SET `name` = "value"')).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(1);
      });
    });

    it('should insert nothing', () => {
      const promise = list.insert({});
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.called).to.equal(false);
        expect(promisify.called).to.equal(false);
        expect(release.called).to.equal(false);
        expect(result).to.equal(0);
      });
    });

    it('should update', () => {
      output = {affectedRows: 1};
      const promise = list.update({name: 'value'});
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith('query', 'UPDATE `table` SET `name` = "value"   ')).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(1);
      });
    });

    it('should update partial', () => {
      output = {affectedRows: 1};
      const promise = list.update({name: 'value'}, {name: 'equal'}, 10, 5, ['name']);
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith(
          'query',
          'UPDATE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10'
        )).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(1);
      });
    });

    it('should update nothing', () => {
      const promise = list.update({});
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.called).to.equal(false);
        expect(promisify.called).to.equal(false);
        expect(release.called).to.equal(false);
        expect(result).to.equal(0);
      });
    });

    it('should remove', () => {
      output = {affectedRows: 1};
      const promise = list.remove();
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith('query', 'DELETE FROM `table`   ')).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(1);
      });
    });

    it('should remove partial', () => {
      output = {affectedRows: 1};
      const promise = list.remove({name: 'value'}, 10, 5, ['name']);
      return expect(promise).to.eventually.be.fulfilled.then((result) => {
        expect(mysql.calledOnce).to.equal(true);
        expect(mysql.calledWith()).to.equal(true);
        expect(promisify.calledOnce).to.equal(true);
        expect(promisify.calledWith(
          'query',
          'DELETE FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10'
        )).to.equal(true);
        expect(release.calledOnce).to.equal(true);
        expect(release.calledWith()).to.equal(true);
        expect(result).to.equal(1);
      });
    });
  });

  describe('error case', () => {
    const error = {};
    let promisify, release, mysql, list;

    beforeEach(() => {
      promisify = sinon.spy(() => Promise.reject(error));
      release = sinon.spy();
      mysql = sinon.spy(() => Promise.resolve({promisify, release}));
      list = new List(mysql, 'table');
    });

    it('should not count', () => {
      const promise = list.count();
      return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
    });

    it('should not select', () => {
      const promise = list.select();
      return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
    });

    it('should not insert', () => {
      const promise = list.insert({name: 'value'});
      return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
    });

    it('should not update', () => {
      const promise = list.update({name: 'value'});
      return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
    });

    it('should not remove', () => {
      const promise = list.remove();
      return expect(promise).to.eventually.be.rejected.and.eventually.equal(error);
    });
  });
});