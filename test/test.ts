import {Pool} from '../lib';

describe('Sth', () => {
  const pool = new Pool({
    host: 'atp.mshome.net',
    port: 30336,
    user: 'root',
    password: 'root',
    schema: 'antragsportal'
  });
  const doer = pool.doer();

  it('should', () => doer.count(''));
});
