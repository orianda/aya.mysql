import {expect} from "chai";
import {describe} from "mocha";
import sinon, {SinonSpy} from "sinon";
import {Doer} from './Doer';
import {List} from "./List";
import {Pool} from "./Pool";

describe('Doer', () => {
  const pool: Pool = {
    schema: 'defaultSchema',
    config: {
      host: 'host',
      port: 123,
      user: 'user',
      password: 'password'
    },
    open: sinon.spy(() => Promise.resolve(session)),
    doer: sinon.spy(() => new Doer(pool))
  };
  const session: {
    sql: SinonSpy;
    close: SinonSpy;
  } = {
    sql: sinon.spy(() => execute),
    close: sinon.spy(() => Promise.resolve())
  };
  const execute: {
    bind: SinonSpy;
    execute: SinonSpy;
  } = {
    bind: sinon.spy(() => execute),
    execute: sinon.spy(() => Promise.resolve(result))
  };
  const column: {
    getColumnName: SinonSpy;
  } = {
    getColumnName: sinon.spy(() => 'column')
  };
  const row: {
    toArray: SinonSpy;
  } = {
    toArray: sinon.spy(() => ['value'])
  };
  const result: {
    getAutoIncrementValue: SinonSpy;
    getAffectedItemsCount: SinonSpy;
    getColumns: SinonSpy;
    getResults: SinonSpy;
    toArray: SinonSpy;
  } = {
    getAutoIncrementValue: sinon.spy(() => 1),
    getAffectedItemsCount: sinon.spy(() => 2),
    getColumns: sinon.spy(() => [column]),
    getResults: sinon.spy(() => []),
    toArray: sinon.spy(() => [])
  };
  const doer = new Doer(pool);

  it('should be a doer', () => {
    expect(doer).to.be.instanceOf(Doer);
  });

  describe('list', () => {

    it('should have list property', () => {
      expect(doer.list).to.be.a('function');
    });

    it('should create list', () => {
      const list = doer.list('table', 'schema');

      expect(list).to.be.instanceof(List);
    });

    it('should have table', () => {
      const list = doer.list('table', 'schema');

      expect(list.table).to.equal('table');
    });

    it('should have schema', () => {
      const list = doer.list('table', 'schema');

      expect(list.schema).to.equal('schema');
    });

    it('should have default schema', () => {
      const list = doer.list('table');

      expect(list.schema).to.equal('defaultSchema');
    });
  });

  describe('count', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
      result.toArray = sinon.spy(() => [[[0]]]);
    });

    it('should fetch', () => doer
      .count('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(0);
      }));

    it('should call sql', () => doer
      .count('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .count('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .count('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .count('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));
  });

  describe('select', () => {

    describe('exists', () => {

      beforeEach(() => {
        session.sql = sinon.spy(() => execute);
        execute.bind = sinon.spy(() => execute);
        result.getResults = sinon.spy(() => [[row]]);
      });

      it('should fetch', () => doer
        .select('query', ['value'])
        .then((issue) => {
          expect(issue).to.deep.equal([{column: 'value'}]);
        }));

      it('should call sql', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(session.sql.callCount).to.equal(1);
        }));

      it('should forward query', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(session.sql.args).to.deep.equal([['query']]);
        }));

      it('should call bind', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(execute.bind.callCount).to.equal(1);
        }));

      it('should forward values', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });

    describe('empty', () => {

      beforeEach(() => {
        session.sql = sinon.spy(() => execute);
        execute.bind = sinon.spy(() => execute);
        result.getResults = sinon.spy(() => []);
      });

      it('should fetch', () => doer
        .select('query', ['value'])
        .then((issue) => {
          expect(issue).to.deep.equal([]);
        }));

      it('should call sql', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(session.sql.callCount).to.equal(1);
        }));

      it('should forward query', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(session.sql.args).to.deep.equal([['query']]);
        }));

      it('should call bind', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(execute.bind.callCount).to.equal(1);
        }));

      it('should forward values', () => doer
        .select('query', ['value'])
        .then(() => {
          expect(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
  });

  describe('insert', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
    });

    it('should fetch', () => doer
      .insert('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(1);
      }));

    it('should call sql', () => doer
      .insert('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .insert('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .insert('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .insert('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));
  });

  describe('update', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
    });

    it('should fetch', () => doer
      .update('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(2);
      }));

    it('should call sql', () => doer
      .update('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .update('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .update('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .update('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));
  });

  describe('replace', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
    });

    it('should fetch', () => doer
      .replace('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(2);
      }));

    it('should call sql', () => doer
      .replace('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .replace('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .replace('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .replace('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));
  });

  describe('remove', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
    });

    it('should fetch', () => doer
      .remove('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(2);
      }));

    it('should call sql', () => doer
      .remove('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .remove('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .remove('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .remove('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));
  });

  describe('submit', () => {

    beforeEach(() => {
      session.sql = sinon.spy(() => execute);
      execute.bind = sinon.spy(() => execute);
    });

    it('should fetch', () => doer
      .submit('query', ['value'])
      .then((issue) => {
        expect(issue).to.equal(result);
      }));

    it('should call sql', () => doer
      .submit('query', ['value'])
      .then(() => {
        expect(session.sql.callCount).to.equal(1);
      }));

    it('should forward query', () => doer
      .submit('query', ['value'])
      .then(() => {
        expect(session.sql.args).to.deep.equal([['query']]);
      }));

    it('should call bind', () => doer
      .submit('query', ['value'])
      .then(() => {
        expect(execute.bind.callCount).to.equal(1);
      }));

    it('should forward values', () => doer
      .submit('query', ['value'])
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[['value']]]);
      }));

    it('should fallback values', () => doer
      .submit('query')
      .then(() => {
        expect(execute.bind.args).to.deep.equal([[[]]]);
      }));

    describe('fail', () => {

      describe('execute', () => {

        beforeEach(() => {
          session.close = sinon.spy(() => Promise.resolve());
          execute.execute = sinon.spy(() => Promise.reject('execute'));
        });

        it('should close', () => doer
          .submit('query', ['value'])
          .catch(() => {
            expect(session.close.callCount).to.equal(1);
          }));

        it('should fail', () => doer
          .submit('query', ['value'])
          .catch((error) => {
            expect(error).to.equal('execute');
          }));
      });

      describe('close', () => {

        beforeEach(() => {
          session.close = sinon.spy(() => Promise.reject('close'));
          execute.execute = sinon.spy(() => Promise.resolve(result));
        });

        it('should close', () => doer
          .submit('query', ['value'])
          .catch(() => {
            expect(session.close.callCount).to.equal(1);
          }));

        it('should fail', () => doer
          .submit('query', ['value'])
          .catch((error) => {
            expect(error).to.equal('close');
          }));
      });
    });
  });
});
