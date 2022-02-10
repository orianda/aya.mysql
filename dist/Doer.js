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
            .then((result) => result.toArray()[0][0][0]);
    }
    select(query, values) {
        return this
            .submit(query, values)
            .then((result) => {
            const rows = result.getResults()[0];
            if (!rows) {
                return [];
            }
            const cols = result
                .getColumns()
                .map((col) => col.getColumnName());
            return rows
                .map((row) => {
                const list = row.toArray();
                const data = {};
                for (let i = 0, l = cols.length; i < l; i++) {
                    const name = cols[i];
                    data[name] = list[i];
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
    submit(query, values) {
        return this.pool
            .open()
            .then((session) => {
            const promise1 = session
                .sql(query)
                .bind(values || [])
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
