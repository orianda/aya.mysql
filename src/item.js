'use strict';

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
     * @returns {Promise}
     */
    has(id) {
        return this.list.count({
            [this.id]: id
        }, 1).then(function (result) {
            return result > 0;
        });
    }

    /**
     * Get entry
     * @param {string|number} id
     * @returns {Promise}
     */
    get(id) {
        return this.list.select(null, {
            [this.id]: id
        }, 1).then(function (result) {
            return result.shift();
        });
    }

    /**
     * Create or replace entry
     * @param {string|number} id
     * @param {Object} data
     * @returns {Promise|*}
     */
    set(id, data) {
        var item = this;
        return this.rid(id).then(function () {
            return item.add(id, data);
        });
    }

    /**
     * Add entry
     * @param {string|number} id
     * @param {Object} data
     * @returns {Promise}
     */
    add(id, data) {
        data[this.id] = id;
        return this.list.insert(data).then(function (result) {
            return result > 0;
        });
    }

    /**
     * Update entry
     * @param {string|number} id
     * @param {Object} data
     * @returns {Promise}
     */
    mod(id, data) {
        return this.list.update(data, {
            [this.id]: id
        }, 1).then(function (result) {
            return result > 0;
        });
    }

    /**
     * Delete entry
     * @param {string|number} id
     * @returns {Promise}
     */
    rid(id) {
        return this.list.remove({
            [this.id]: id
        }, 1).then(function (result) {
            return result > 0;
        });
    }
}

module.exports = Item;