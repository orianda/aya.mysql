const pool = require('./pool');
const List = require('./list');
const Item = require('./item');

/**
 * Create pool which supports list and item wrapper
 * @param {Object} options
 * @returns {Function}
 */
module.exports = function(options) {
  const p = pool(options);

  /**
   * Get list wrapper
   * @param {string} table
   * @returns {List}
   */
  p.list = function(table) {
    const list = new List(p, table);

    /**
     * Get item wrapper
     * @param {string} id
     * @returns {Item}
     */
    list.item = function(id) {
      return new Item(list, id);
    };

    return list;
  };

  return p;
};