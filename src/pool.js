const mysql = require('mysql');

/**
 * Promisify connection method
 * @param {string} name
 * @returns {Promise}
 */
function promisify(name) {
  const args = Array.prototype.slice.call(arguments, 1);
  return new Promise((resolve, reject) => {
    args.push((error) => {
      const args = Array.prototype.slice.call(arguments, 1);
      if (error) {
        reject(error);
      } else {
        resolve.apply(null, args);
      }
    });
    this[name].apply(this, args);
  });
}

/**
 * Create connection pool
 * @see https://github.com/felixge/node-mysql#connection-options
 * @params {Object} options
 * @params {string} options.user
 * @params {string} options.password
 * @params {string} options.database
 * @returns {Function}
 */
module.exports = function(options) {
  const pool = mysql.createPool(options);

  /**
   * Create connection
   * @returns {Promise}
   */
  return function() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          connection.promisify = promisify;
          resolve(connection);
        }
      });
    });
  };
};