'use strict';

var mysql = require('mysql');

/**
 * Promisify connection method
 * @param {string} name
 * @returns {Promise}
 */
function promisify(name) {
    var args = Array.prototype.slice.call(arguments, 1),
        context = this;
    return new Promise(function (resolve, reject) {
        args.push(function (error) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (error) {
                reject(error);
            } else {
                resolve.apply(null, args);
            }
        });
        context[name].apply(context, args);
    });
}

/**
 * Create connection pool
 * @see https://github.com/felixge/node-mysql#connection-options
 * @params {Object} options
 * @params {string} options.user
 * @params {string} options.password
 * @params {string} options.database
 * @returns {Function}
 */
module.exports = function (options) {
    var pool = mysql.createPool(options);

    /**
     * Create connection
     * @returns {Promise}
     */
    return function(){
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject(error);
                } else {
                    connection.promisify = promisify;
                    resolve(connection);
                }
            });
        });
    };
};