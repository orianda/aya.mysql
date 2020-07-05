/**
 * Table row wrapper
 * Support operations on single rows of the table
 */
class Item {

  /**
   * @constructor
   * @param {List} list
   * @param {string} id
   */
  constructor(list, id) {
    this.list = list;
    this.id = id;
  }

  /**
   * Entry exists?
   * @param {string|number} id
   * @returns {Promise<boolean, Error>}
   */
  has(id) {
    return this.list
      .count({[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  /**
   * Get entry
   * @param {string|number} id
   * @returns {Promise<Object, Error>}
   */
  get(id) {
    return this.list
      .select(null, {[this.id]: id}, 1)
      .then((result) => result.shift());
  }

  /**
   * Create or replace entry
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<boolean, Error>}
   */
  set(id, data) {
    return this
      .rid(id)
      .then(() => this.add(id, data));
  }

  /**
   * Add entry
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<boolean, Error>}
   */
  add(id, data) {
    data[this.id] = id;
    return this.list
      .insert(data)
      .then((result) => result > 0);
  }

  /**
   * Update entry
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<boolean, Error>}
   */
  mod(id, data) {
    return this.list
      .update(data, {[this.id]: id}, 1)
      .then((result) => result > 0);
  }

  /**
   * Delete entry
   * @param {string|number} id
   * @returns {Promise<boolean, Error>}
   */
  rid(id) {
    return this.list
      .remove({[this.id]: id}, 1)
      .then((result) => result > 0);
  }
}

module.exports = Item;
