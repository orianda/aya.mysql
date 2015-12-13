'use strict';

var pool = require('./pool'),
    List = require('./list'),
    Item = require('./item');

/**
 * Create pool which supports list and item wrapper
 * @param {Object} options
 * @returns {Function}
 */
module.exports = function (options) {
    var p = pool(options);

    /**
     * Get list wrapper
     * @param {string} table
     * @returns {List}
     */
    p.list = function (table) {
        var list = new List(p, table);

        /**
         * Get item wrapper
         * @param {string} id
         * @returns {Item}
         */
        list.item = function (id) {
            return new Item(list, id);
        };

        return list;
    };

    return p;
};