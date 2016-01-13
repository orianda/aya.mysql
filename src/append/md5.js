'use strict';

var crypto = require('crypto'),
    append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function (item, data, bounces) {
    var date = new Date(),
        salt = date.getTime() + '.' + date.getMilliseconds() + ':';
    return append(item, data, function (bounces) {
        return crypto.createHash('md5').update(salt + bounces).digest('hex');
    }, bounces);
};