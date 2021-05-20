"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const xdevapi_1 = require("@mysql/xdevapi");
const List_1 = require("./List");
const Item_1 = require("./Item");
class Pool {
    constructor(_a) {
        var { schema } = _a, connection = __rest(_a, ["schema"]);
        this.schema = schema;
        this.client = xdevapi_1.getClient(connection, {
            pooling: {
                enabled: true,
                maxSize: 1,
                maxIdleTime: 1000,
                queueTimeout: 2000
            }
        });
    }
    pool() {
        return this.client.getSession();
    }
    list(table, schema = this.schema) {
        const pool = this.pool.bind(this);
        const list = new List_1.List(pool, table, schema);
        const item = (id) => new Item_1.Item(list, id);
        return Object.assign(list, { item });
    }
}
exports.Pool = Pool;
