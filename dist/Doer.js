"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doer = void 0;
const List_1 = require("./List");
class Doer {
    constructor(pool) {
        this.pool = pool;
    }
    list(table, schema) {
        return new List_1.List(this, table, schema || this.pool.schema);
    }
    count(query, values) {
        return this
            .submit(query, values)
            .then((result) => {
            const [olga] = result.fetchOne();
            return isNaN(olga) ? NaN : olga;
        });
    }
    select(query, values) {
        return this
            .submit(query, values)
            .then((result) => {
            const rows = result.fetchAll();
            const cols = result
                .getColumns()
                .map((col) => col.getColumnName());
            return rows
                .map((list) => {
                const data = {};
                for (let i = 0, l = cols.length; i < l; i++) {
                    const name = cols[i];
                    const value = list[i];
                    data[name] = value instanceof Buffer ? value.toString() : value === null ? undefined : value;
                }
                return data;
            });
        });
    }
    insert(query, values) {
        return this
            .submit(query, values)
            .then((result) => result.getAutoIncrementValue());
    }
    update(query, values) {
        return this
            .submit(query, values)
            .then((result) => result.getAffectedItemsCount());
    }
    replace(query, values) {
        return this
            .submit(query, values)
            .then((result) => result.getAffectedItemsCount());
    }
    remove(query, values) {
        return this
            .submit(query, values)
            .then((result) => result.getAffectedItemsCount());
    }
    submit(query, values = []) {
        return this.pool
            .open()
            .then((session) => {
            const [arg, ...args] = values;
            const promise1 = session
                .sql(query)
                .bind(arg !== null && arg !== void 0 ? arg : null, ...args)
                .execute();
            const promise2 = promise1
                .catch(() => undefined)
                .then(() => session.close());
            return Promise
                .all([promise1, promise2])
                .then(([result]) => result);
        });
    }
}
exports.Doer = Doer;
