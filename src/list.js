const querylize = require('aya.mysql.querylizer');

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
   * Submit query to mysql
   * @param {string} query
   * @returns {Promise<Object, Error>}
   */
  submit(query) {
    return this
      .mysql()
      .then((session) => {
        const promise1 = session
          .sql(query)
          .execute();
        const promise2 = promise1
          .then(() => undefined, () => undefined)
          .then(() => session.close());
        return Promise
          .all([promise1, promise2])
          .then(([result]) => result);
      });
  }

  /**
   * Count affected rows
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @returns {Promise<number, Error>}
   */
  count(where, amount, offset) {
    const whereQuery = querylize.where(where);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`SELECT COUNT(*) FROM \`${this.table}\` ${whereQuery} ${limitQuery}`)
      .then((result) => result.toArray()[0][0][0]);

  }

  /**
   * Select rows
   * @param {Object} [names=[]]
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @param {Array} [order=[]]
   * @returns {Promise<Object[], Error>}
   */
  select(names, where, amount, offset, order) {
    const namesQuery = querylize.names(names);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`SELECT ${namesQuery} FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
      .then((result) => {
        const cols = result
          .getColumns()
          .map((col) => col.getColumnName());
        return result
          .getResults()[0]
          .map((row) => {
            const data = {};
            for (let i = 0, l = cols.length; i < l; i++) {
              const name = cols[i];
              data[name] = row[i];
            }
            return data;
          });
      });
  }

  /**
   * Inserts new row
   * @param {Object} [data]
   * @returns {Promise<number|undefined, Error>}
   */
  insert(data) {
    const valueQuery = querylize.values(data) || '() VALUES ()';
    return this
      .submit(`INSERT INTO \`${this.table}\` ${valueQuery}`)
      .then((result) => result.getAutoIncrementValue());
  }

  /**
   * Update rows
   * @param {Object} [data]
   * @param {Object} [where={}]
   * @param {number} [amount=0]
   * @param {number} [offset=0]
   * @param {Array} [order=[]]
   * @returns {Promise<number, Error>}
   */
  update(data, where, amount, offset, order) {
    const valueQuery = querylize.values(data);
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    if (valueQuery) {
      return this
        .submit(`UPDATE \`${this.table}\` ${valueQuery} ${whereQuery} ${orderQuery} ${limitQuery}`)
        .then((result) => result.getAffectedItemsCount());
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
   * @returns {Promise<number, Error>}
   */
  remove(where, amount, offset, order) {
    const whereQuery = querylize.where(where);
    const orderQuery = querylize.order(order);
    const limitQuery = querylize.limit(amount, offset);
    return this
      .submit(`DELETE FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
      .then((result) => result.getAffectedItemsCount());
  }
}

module.exports = List;
