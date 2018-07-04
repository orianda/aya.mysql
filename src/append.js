/**
 * Append entry to table
 * @param {Item} item
 * @param {Object} data
 * @param {Function} generate
 * @param {number} bounces
 * @returns {Promise}
 */
function append(item, data, generate, bounces) {
  const id = generate(bounces);
  return item
    .add(id, data)
    .then(
      (added) => added ? id : undefined,
      (error) => {
        if (error.code !== 'ER_DUP_ENTRY') {
          return Promise.reject(error);
        } else if (bounces > 0) {
          return append(item, data, generate, bounces - 1);
        } else {
          return Promise.reject({
            message: 'out of bounce'
          });
        }
      }
    );
}

/**
 * Append data and return id
 * @param {Item} item
 * @param {Object} data
 * @param {Function} generate
 * @param {number} [bounces=32]
 * @returns {Promise}
 */
module.exports = function(item, data, generate, bounces) {
  bounces = bounces > 0 ? bounces : 32;
  return append(item, data, generate, bounces - 1);
};