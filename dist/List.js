"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const aya_mysql_querylizer_1 = require("aya.mysql.querylizer");
const Item_1 = require("./Item");
class List {
    constructor(doer, table, schema) {
        this.doer = doer;
        this.table = table;
        this.schema = schema;
        this.querylize = new aya_mysql_querylizer_1.Table(table, schema);
    }
    item(id) {
        return new Item_1.Item(this, id);
    }
    count(where, amount, offset) {
        const query = this.querylize.count(where, amount, offset);
        return this.doer.count(query);
    }
    select(names, where, amount, offset, order) {
        const query = this.querylize.select(names, where, amount, offset, order);
        return this.doer.select(query);
    }
    insert(values) {
        const query = this.querylize.insert(values);
        return this.doer.insert(query);
    }
    update(values, where, amount, offset, order) {
        const query = this.querylize.update(values, where, amount, offset, order);
        return query ? this.doer.update(query) : Promise.resolve(0);
    }
    replace(values, where, amount, offset, order) {
        const query = this.querylize.replace(values, where, amount, offset, order);
        return query ? this.doer.replace(query) : Promise.resolve(0);
    }
    remove(where, amount, offset, order) {
        const query = this.querylize.remove(where, amount, offset, order);
        return this.doer.remove(query);
    }
}
exports.List = List;
