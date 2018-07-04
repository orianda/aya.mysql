const querylize = require('aya.mysql.querylizer');

/**
 * Submit query to mysql
 * @param {Function} mysql
 * @param {string} query
 * @returns {Promise}
 */
function submit(mysql, query) {
  return mysql().then((connection) => {
    const issue = connection.promisify('query', query);
    issue.then(() => null, () => null).then(() => connection.release());
    return issue;
  });
}

/**
 * Table wrapper
 * Support operations on multiple rows of the table
 */
class List {

  /**
   * @constructor
   * @param {Function} mysql
   * @param {string} table
   */
  constructor(mysql, table) {
    this.mysql = mysql;
    this.table = table;
  }

  /**
   * Count affected rows
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @returns {Promise}
   */
  count(where, amount, offset) {
    const whereQuery = querylize.where(where);
    const limitQuery = querylize.limit(amount, offset);
    const query = 'SELECT COUNT(*) AS `amount` FROM `' + this.table + '` ' + whereQuery + ' ' + limitQuery;
    return submit(this.mysql, query).then((result) => result[0].amount);
  }

  /**
   * Select rows
   * @param {Object} [names=[]]
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @param {Array} [order=[]]
   * @returns {Promise}
   */
  select(names, where, amount, offset, order) {
    const namesQuery = querylize.names(names);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    const query = 'SELECT ' + namesQuery + ' FROM `' + this.table + '` ' + whereQuery + ' ' + orderQuery + ' ' + limitQuery;
    return submit(this.mysql, query);
  }

  /**
   * Inserts new row
   * @param {Object} data
   * @returns {Promise}
   */
  insert(data) {
    const valueQuery = querylize.values(data);
    const query = 'INSERT INTO `' + this.table + '` ' + valueQuery;
    if (valueQuery) {
      return submit(this.mysql, query).then((result) => result.affectedRows);
    } else {
      return Promise.resolve(0);
    }
  }

  /**
   * Update rows
   * @param {Object} data
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @param {Array} [order=[]]
   * @returns {Promise}
   */
  update(data, where, amount, offset, order) {
    const valueQuery = querylize.values(data);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    const query = 'UPDATE `' + this.table + '` ' + valueQuery + ' ' + whereQuery + ' ' + orderQuery + ' ' + limitQuery;
    if (valueQuery) {
      return submit(this.mysql, query)
        .then((result) => result.affectedRows);
    } else {
      return Promise.resolve(0);
    }
  }

  /**
   * Remove rows
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @param {Array} [order=[]]
   * @returns {Promise}
   */
  remove(where, amount, offset, order) {
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    const query = 'DELETE FROM `' + this.table + '` ' + whereQuery + ' ' + orderQuery + ' ' + limitQuery;
    return submit(this.mysql, query).then((result) => result.affectedRows);
  }
}

module.exports = List;