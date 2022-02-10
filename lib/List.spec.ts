import {expect} from "chai";
import {describe} from "mocha";
import sinon, {SinonSpy} from "sinon";
import {Item} from "./Item";
import {List} from './List';
import {Pool} from "./Pool";

describe('List', () => {

  const doer: {
    pool: Pool;
    list: SinonSpy;
    count: SinonSpy;
    select: SinonSpy;
    insert: SinonSpy;
    update: SinonSpy;
    replace: SinonSpy;
    remove: SinonSpy;
    submit: SinonSpy;
  } = {
    pool: {} as Pool,
    list: sinon.spy(() => undefined),
    count: sinon.spy(() => Promise.resolve(0)),
    select: sinon.spy(() => Promise.resolve([])),
    insert: sinon.spy(() => Promise.resolve(1)),
    update: sinon.spy(() => Promise.resolve(2)),
    replace: sinon.spy(() => Promise.resolve(3)),
    remove: sinon.spy(() => Promise.resolve(4)),
    submit: sinon.spy(() => Promise.resolve())
  };
  const list = new List(doer, 'table');

  it('should be a list', () => {
    expect(list).to.be.instanceOf(List);
  });

  describe('item', () => {

    it('should have item property', () => {
      expect(list.item).to.be.a('function');
    });

    it('should create item', () => {
      const item = list.item('id');

      expect(item).to.be.instanceof(Item);
    });

    it('should have id', () => {
      const item = list.item('id');

      expect(item.id).to.equal('id');
    });
  });

  describe('count', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.count = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .count({name: 'value'}, 10, 5)
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .count({name: 'value'}, 10, 5)
        .then(() => {
          expect(doer.count.args).to.deep.equal([['SELECT COUNT(*) AS `amount` FROM `table` WHERE `name` = "value" LIMIT 5, 10']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.count = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .count()
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .count()
        .then(() => {
          expect(doer.count.args).to.deep.equal([['SELECT COUNT(*) AS `amount` FROM `table`']]);
        }));
    });
  });

  describe('select', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.select = sinon.spy(() => Promise.resolve([{column: 'value'}]));
      });

      it('should fetch', () => list
        .select(['name'], {name: 'value'}, 10, 5, ['name'])
        .then((issue) => {
          expect(issue).to.deep.equal([{column: 'value'}]);
        }));

      it('should forward query', () => list
        .select(['name'], {name: 'value'}, 10, 5, ['name'])
        .then(() => {
          expect(doer.select.args).to.deep.equal([['SELECT `name` FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.select = sinon.spy(() => Promise.resolve([{column: 'value'}]));
      });

      it('should fetch', () => list
        .select()
        .then((issue) => {
          expect(issue).to.deep.equal([{column: 'value'}]);
        }));

      it('should forward query', () => list
        .select()
        .then(() => {
          expect(doer.select.args).to.deep.equal([['SELECT * FROM `table`']]);
        }));
    });
  });

  describe('insert', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.insert = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .insert({name: 'value'})
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .insert({name: 'value'})
        .then(() => {
          expect(doer.insert.args).to.deep.equal([['INSERT INTO `table` SET `name` = "value"']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.insert = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .insert()
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .insert()
        .then(() => {
          expect(doer.insert.args).to.deep.equal([['INSERT INTO `table` () VALUES ()']]);
        }));
    });
  });

  describe('update', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.update = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .update({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .update({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then(() => {
          expect(doer.update.args).to.deep.equal([['UPDATE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.update = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .update()
        .then((issue) => {
          expect(issue).to.equal(0);
        }));

      it('should forward query', () => list
        .update()
        .then(() => {
          expect(doer.update.args).to.deep.equal([]);
        }));
    });
  });

  describe('replace', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.replace = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .replace({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .replace({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then(() => {
          expect(doer.replace.args).to.deep.equal([['REPLACE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.replace = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .replace()
        .then((issue) => {
          expect(issue).to.equal(0);
        }));

      it('should forward query', () => list
        .replace()
        .then(() => {
          expect(doer.replace.args).to.deep.equal([]);
        }));
    });
  });

  describe('remove', () => {

    describe('exists', () => {

      beforeEach(() => {
        doer.remove = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .remove({name: 'value'}, 10, 5, ['name'])
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .remove({name: 'value'}, 10, 5, ['name'])
        .then(() => {
          expect(doer.remove.args).to.deep.equal([['DELETE FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10']]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        doer.remove = sinon.spy(() => Promise.resolve(1));
      });

      it('should fetch', () => list
        .remove()
        .then((issue) => {
          expect(issue).to.equal(1);
        }));

      it('should forward query', () => list
        .remove()
        .then(() => {
          expect(doer.remove.args).to.deep.equal([['DELETE FROM `table`']]);
        }));
    });
  });
});
