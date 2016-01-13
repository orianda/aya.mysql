'use strict';

var randomstring = require('randomstring'),
    append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {number} [length=32]
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function (item, data, length, bounces) {
    length = length || 32;
    return append(item, data, function () {
        return randomstring.generate(length);
    }, bounces);
};