const randomstring = require('randomstring');
const append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {Object} [options]
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function(item, data, options, bounces) {
  return append(item, data, () => randomstring.generate(options), bounces);
};