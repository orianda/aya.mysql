'use strict';

var randomstring = require('randomstring'),
    append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {Object} [options]
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function (item, data, options, bounces) {
    return append(item, data, function () {
        return randomstring.generate(options);
    }, bounces);
};