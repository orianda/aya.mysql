'use strict';

var querylize = require('aya.mysql.querylizer');

/**
 * Submit query to mysql
 * @param {Function} mysql
 * @param {string} query
 * @param {Array} params
 * @returns {Promise}
 */
function submit(mysql, query, params) {
    return mysql().then(function (connection) {
        return connection.promisify('query', query, params).then(function (result) {
            connection.release();
            return result;
        }, function (error) {
            connection.release();
            return Promise.reject(error);
        });
    });
}

/**
 * Return first item of result set
 * @param {Object} result
 * @returns {number|string}
 */
function count(result) {
    return result[0].amount;
}

/**
 * Return affected rows
 * @param {Object} result
 * @param {number} result.affectedRows
 * @returns {number}
 */
function affectedRows(result) {
    return result.affectedRows;
}

/**
 * Table wrapper
 * Support operations on multiple rows of the table
 */
class List {

    /**
     * @constructor
     * @param {Function} mysql
     * @param {string} table
     */
    constructor(mysql, table) {
        this.mysql = mysql;
        this.table = table;
    }

    /**
     * Count affected rows
     * @param {Object} [where={}]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @returns {Promise}
     */
    count(where, amount, offset) {
        var whereQuery = querylize.where(where),
            limitQuery = querylize.limit(amount, offset),
            query = 'SELECT COUNT(*) AS `amount` FROM `' + this.table + '` ' + whereQuery.query + ' ' + limitQuery;
        return submit(this.mysql, query, whereQuery.params).then(count);
    }

    /**
     * Select rows
     * @param {Object} [names=[]]
     * @param {Object} [where={}]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {Promise}
     */
    select(names, where, amount, offset, order) {
        var namesQuery = querylize.names(names),
            whereQuery = querylize.where(where),
            orderQuery = querylize.order(order),
            limitQuery = querylize.limit(amount, offset),
            query = 'SELECT ' + namesQuery + ' FROM `' + this.table + '` ' + whereQuery.query + ' ' + orderQuery + ' ' + limitQuery;
        return submit(this.mysql, query, whereQuery.params);
    }

    /**
     * Inserts new row
     * @param {Object} data
     * @returns {Promise}
     */
    insert(data) {
        var valueQuery = querylize.values(data),
            query = 'INSERT INTO `' + this.table + '` ' + valueQuery.query;
        if (valueQuery.query) {
            return submit(this.mysql, query, valueQuery.params).then(affectedRows);
        } else {
            return Promise.resolve(0);
        }
    }

    /**
     * Update rows
     * @param {Object} data
     * @param {Object} [where={}]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {Promise}
     */
    update(data, where, amount, offset, order) {
        var valueQuery = querylize.values(data),
            whereQuery = querylize.where(where),
            orderQuery = querylize.order(order),
            limitQuery = querylize.limit(amount, offset),
            query = 'UPDATE `' + this.table + '` ' + valueQuery.query + ' ' + whereQuery.query + ' ' + orderQuery + ' ' + limitQuery;
        if (valueQuery.query) {
            return submit(this.mysql, query, valueQuery.params.concat(whereQuery.params)).then(affectedRows);
        } else {
            return Promise.resolve(0);
        }
    }

    /**
     * Remove rows
     * @param {Object} [where={}]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {Promise}
     */
    remove(where, amount, offset, order) {
        var whereQuery = querylize.where(where),
            orderQuery = querylize.order(order),
            limitQuery = querylize.limit(amount, offset),
            query = 'DELETE FROM `' + this.table + '` ' + whereQuery.query + ' ' + orderQuery + ' ' + limitQuery;
        return submit(this.mysql, query, whereQuery.params).then(affectedRows);
    }
}

module.exports = List;