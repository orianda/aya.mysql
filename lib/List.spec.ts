import {Result, Row} from "@mysql/xdevapi";
import {expect} from "chai";
import sinon, {SinonSpy} from "sinon";
import {PoolDto} from "./pool.dto";
import List from './List';

describe('List', () => {

  describe('success case', () => {
    let result: Partial<Result>;
    let session: {
      sql: SinonSpy,
      close: SinonSpy
    };
    let mysql: SinonSpy;
    let list: List;

    beforeEach(() => {
      const statement = {
        execute: () => Promise.resolve(result)
      }
      session = {
        sql: sinon.spy(() => statement),
        close: sinon.spy(() => Promise.resolve())
      };
      mysql = sinon.spy(() => Promise.resolve(session));
      list = new List(mysql as unknown as PoolDto, 'table');
    });

    it('should count', () => {
      result = {
        toArray: () => [[[0]]]
      };
      return list
        .count()
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('SELECT COUNT(*) AS `amount` FROM `table`')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(0);
        });
    });

    it('should count partial', () => {
      result = {
        toArray: () => [[[0]]]
      };
      return list
        .count({name: 'value'}, 10, 5)
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('SELECT COUNT(*) AS `amount` FROM `table` WHERE `name` = "value" LIMIT 5, 10')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(0);
        });
    });

    it('should select', () => {
      result = {
        getColumns: () => [{
          getColumnName: () => 'name'
        }],
        getResults: () => [[{
          toArray: () => ['value1']
        } as any as Row, {
          toArray: () => ['value2']
        } as any as Row]]
      };
      return list
        .select()
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('SELECT * FROM `table`')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.deep.equal([{name: 'value1'}, {name: 'value2'}]);
        });
    });

    it('should select partial', () => {
      result = {
        getColumns: () => [{
          getColumnName: () => 'name'
        }],
        getResults: () => [[{
          toArray: () => ['value1']
        } as any as Row, {
          toArray: () => ['value2']
        } as any as Row]]
      };
      return list
        .select(['name'], {name: 'value'}, 10, 5, ['name'])
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('SELECT `name` FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.deep.equal([{name: 'value1'}, {name: 'value2'}]);
        });
    });

    it('should insert', () => {
      result = {
        getAutoIncrementValue: () => 1
      };
      return list
        .insert({name: 'value'})
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('INSERT INTO `table` SET `name` = "value"')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should insert empty row', () => {
      result = {
        getAutoIncrementValue: () => 1
      };
      return list
        .insert()
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('INSERT INTO `table` () VALUES ()')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should update', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .update({name: 'value'})
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('UPDATE `table` SET `name` = "value"')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should update partial', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .update({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('UPDATE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should update nothing', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .update({})
        .then((issue) => {
          expect(mysql.called).to.equal(false);
          expect(session.sql.called).to.equal(false);
          expect(session.close.called).to.equal(false);
          expect(issue).to.equal(0);
        });
    });

    it('should replace', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .replace({name: 'value'})
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('REPLACE `table` SET `name` = "value"')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should replace partial', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .replace({name: 'value'}, {name: 'equal'}, 10, 5, ['name'])
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('REPLACE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should replace nothing', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .replace({})
        .then((issue) => {
          expect(mysql.called).to.equal(false);
          expect(session.sql.called).to.equal(false);
          expect(session.close.called).to.equal(false);
          expect(issue).to.equal(0);
        });
    });

    it('should remove', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .remove()
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('DELETE FROM `table`')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });

    it('should remove partial', () => {
      result = {
        getAffectedItemsCount: () => 1
      };
      return list
        .remove({name: 'value'}, 10, 5, ['name'])
        .then((issue) => {
          expect(mysql.calledOnce).to.equal(true);
          expect(mysql.calledWith()).to.equal(true);
          expect(session.sql.calledOnce).to.equal(true);
          expect(session.sql.calledWith('DELETE FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10')).to.equal(true);
          expect(session.close.calledOnce).to.equal(true);
          expect(session.close.calledWith()).to.equal(true);
          expect(issue).to.equal(1);
        });
    });
  });

  describe('error case', () => {
    const error1 = new Error();
    const error2 = new Error();
    const error3 = new Error();

    Array
      .from(new Array(3 ** 2 - 1), (_, index) => index)
      .slice(1)
      .map((value) => value.toString(2))
      .map((value) => value.padStart(3, '0'))
      .map((value) => value.split(''))
      .map((value) => value.map((value) => value === '1'))
      .forEach(([sess, exec, close]) => {

        describe(JSON.stringify({sess, exec, close}), () => {
          const error = sess ? error1 : exec ? error2 : close ? error3 : undefined;
          let session: {
            sql: SinonSpy,
            close: SinonSpy
          };
          let list: List;

          beforeEach(() => {
            const statement = {
              execute: () => exec ? Promise.reject(error2) : Promise.resolve()
            }
            session = {
              sql: sinon.spy(() => statement),
              close: sinon.spy(() => close ? Promise.reject(error3) : Promise.resolve())
            };
            const mysql = sinon.spy(() => sess ? Promise.reject(error1) : Promise.resolve(session));
            list = new List(mysql as unknown as PoolDto, 'table');
          });

          ['submit', 'count', 'select', 'insert', 'update', 'replace', 'remove'].forEach((name) => {

            it(`should fail for ${name}`, () => {
              return (list as any)[name]({some: 'data'})
                .then(() => {
                  expect(false).to.equal(true);
                }, (issue: Error) => {
                  expect(issue).to.equal(error);
                });
            });
          });
        });
      });
  });
});
