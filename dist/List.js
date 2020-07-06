"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aya_mysql_querylizer_1 = __importDefault(require("aya.mysql.querylizer"));
class List {
    constructor(pool, table) {
        this.pool = pool;
        this.table = table;
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
    count(where, amount, offset) {
        const whereQuery = aya_mysql_querylizer_1.default.where(where);
        const limitQuery = aya_mysql_querylizer_1.default.limit(amount, offset);
        return this
            .submit(`SELECT COUNT(*) FROM \`${this.table}\` ${whereQuery} ${limitQuery}`)
            .then((result) => result.toArray()[0][0][0]);
    }
    select(names, where, amount, offset, order) {
        const namesQuery = aya_mysql_querylizer_1.default.names(names);
        const whereQuery = aya_mysql_querylizer_1.default.where(where);
        const orderQuery = aya_mysql_querylizer_1.default.order(order);
        const limitQuery = aya_mysql_querylizer_1.default.limit(amount, offset);
        return this
            .submit(`SELECT ${namesQuery} FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
            .then((result) => {
            const cols = result
                .getColumns()
                .map((col) => col.getColumnName());
            return result
                .getResults()[0]
                .map((row) => {
                const data = {};
                for (let i = 0, l = cols.length; i < l; i++) {
                    const name = cols[i];
                    data[name] = row[i];
                }
                return data;
            });
        });
    }
    insert(data) {
        const valueQuery = aya_mysql_querylizer_1.default.values(data) || '() VALUES ()';
        return this
            .submit(`INSERT INTO \`${this.table}\` ${valueQuery}`)
            .then((result) => result.getAutoIncrementValue());
    }
    update(data, where, amount, offset, order) {
        const valueQuery = aya_mysql_querylizer_1.default.values(data);
        const whereQuery = aya_mysql_querylizer_1.default.where(where);
        const orderQuery = aya_mysql_querylizer_1.default.order(order);
        const limitQuery = aya_mysql_querylizer_1.default.limit(amount, offset);
        if (valueQuery) {
            return this
                .submit(`UPDATE \`${this.table}\` ${valueQuery} ${whereQuery} ${orderQuery} ${limitQuery}`)
                .then((result) => result.getAffectedItemsCount());
        }
        else {
            return Promise.resolve(0);
        }
    }
    remove(where, amount, offset, order) {
        const whereQuery = aya_mysql_querylizer_1.default.where(where);
        const orderQuery = aya_mysql_querylizer_1.default.order(order);
        const limitQuery = aya_mysql_querylizer_1.default.limit(amount, offset);
        return this
            .submit(`DELETE FROM \`${this.table}\` ${whereQuery} ${orderQuery} ${limitQuery}`)
            .then((result) => result.getAffectedItemsCount());
    }
}
exports.default = List;
