import mysql, {Session} from '@mysql/xdevapi';
import {expect} from 'chai';
import {describe} from 'mocha';
import sinon from 'sinon';
import {Doer} from './Doer';
import {Pool} from './Pool';

describe('Pool', () => {
  const session: Session = {} as Session;
  let pool: Pool;

  beforeEach(() => {
    sinon
      .stub(mysql, 'getSession')
      .resolves(session);
    pool = new Pool({
      host: 'host',
      port: 123456,
      user: 'user',
      password: 'password',
      schema: 'schema'
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a pool', () => {
    expect(pool).to.be.instanceOf(Pool);
  });

  describe('constructor', () => {

    it('should have schema', () => {
      expect(pool.schema).to.equal('schema');
    });

    it('should have config', () => {
      expect(pool.config).to.deep.equal({
        host: 'host',
        port: 123456,
        user: 'user',
        password: 'password'
      });
    });
  });

  describe('doer', () => {

    it('should create doer', () => {
      const doer = pool.doer();

      expect(doer).to.be.instanceOf(Doer);
    });
  });

  describe('open', () => {

    it('should create session', () => {
      return pool
        .open()
        .then((issue) => {
          expect(issue).to.equal(session);
        });
    });
  });
});
