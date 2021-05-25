"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const aya_mysql_querylizer_1 = require("aya.mysql.querylizer");
class List {
    constructor(pool, table, schema) {
        this.pool = pool;
        this.table = table;
        this.schema = schema;
        this.querylize = new aya_mysql_querylizer_1.Table(table, schema);
    }
    count(where, amount, offset) {
        const query = this.querylize.count(where, amount, offset);
        return this
            .submit(query)
            .then((result) => result.toArray()[0][0][0]);
    }
    select(names, where, amount, offset, order) {
        const query = this.querylize.select(names, where, amount, offset, order);
        return this
            .submit(query)
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
    insert(values) {
        const query = this.querylize.insert(values);
        return this
            .submit(query)
            .then((result) => result.getAutoIncrementValue());
    }
    update(values, where, amount, offset, order) {
        const query = this.querylize.update(values, where, amount, offset, order);
        if (query) {
            return this
                .submit(query)
                .then((result) => result.getAffectedItemsCount());
        }
        else {
            return Promise.resolve(0);
        }
    }
    replace(values, where, amount, offset, order) {
        const query = this.querylize.replace(values, where, amount, offset, order);
        if (query) {
            return this
                .submit(query)
                .then((result) => result.getAffectedItemsCount());
        }
        else {
            return Promise.resolve(0);
        }
    }
    remove(where, amount, offset, order) {
        const query = this.querylize.remove(where, amount, offset, order);
        return this
            .submit(query)
            .then((result) => result.getAffectedItemsCount());
    }
    submit(query) {
        return this
            .pool()
            .then((session) => {
            const promise1 = session
                .sql(query)
                .execute();
            const promise2 = promise1
                .then(() => undefined, () => undefined)
                .then(() => session.close());
            return Promise
                .all([promise1, promise2])
                .then(([result]) => result);
        });
    }
}
exports.List = List;
