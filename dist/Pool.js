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
const Doer_1 = require("./Doer");
class Pool {
    constructor(_a) {
        var { schema } = _a, connection = __rest(_a, ["schema"]);
        this.schema = schema;
        this.config = connection;
    }
    doer() {
        return new Doer_1.Doer(this);
    }
    open() {
        return (0, xdevapi_1.getSession)(this.config);
    }
}
exports.Pool = Pool;
