const mysql = require('@mysql/xdevapi');

/**
 * Create connection pool
 * @params {Object} options
 * @returns {Function}
 */
module.exports = (options) => {
  const client = mysql.getClient({
    ...options,
    schema: options.schema || options.database,
    pooling: {
      enabled: true,
      maxSize: 1,
      maxIdleTime: 1000,
      queueTimeout: 2000
    }
  });

  /**
   * Create session
   * @returns {Promise<Session, Error>}
   */
  return () => client.getSession();
};
