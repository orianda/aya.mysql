const crypto = require('crypto');
const append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function(item, data, bounces) {
  const date = new Date();
  const salt = date.getTime() + '.' + date.getMilliseconds() + ':';
  return append(item, data, (bounces) => crypto.createHash('md5').update(salt + bounces).digest('hex'), bounces);
};