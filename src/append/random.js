const randomstring = require('randomstring');
const append = require('../append');

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {Object} [options]
 * @param {number} [bounces=32]
 * @returns {Promise<string, Error>}
 */
module.exports = (item, data, options, bounces) => append(item, data, () => randomstring.generate(options), bounces);
