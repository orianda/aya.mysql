var crypto = require('crypto');

/**
 * Append entry to table
 * @param {Item} item
 * @param {Object} data
 * @param {string} salt
 * @param {number} bounces
 * @returns {Promise}
 */
function append(item, data, salt, bounces) {
    var id = crypto.createHash('md5').update(salt + bounces).digest('hex');
    return item.add(id, data).then(function () {
        return id;
    }, function (error) {
        if (error.code !== 'ER_DUP_ENTRY') {
            return Promise.reject(error);
        } else if (bounces > 0) {
            return append(item, data, salt, bounces - 1);
        } else {
            return Promise.reject(new Error('out of bounce'));
        }
    });
}

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
    bounces = bounces > 0 ? bounces : 32;
    return append(item, data, salt, bounces - 1);
};