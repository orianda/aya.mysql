"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = __importDefault(require("./List"));
const Item_1 = __importDefault(require("./Item"));
const pool_1 = __importDefault(require("./pool"));
exports.default = (options) => {
    const pool = pool_1.default(options);
    const list = (table) => {
        const list = new List_1.default(pool, table);
        const item = (id) => new Item_1.default(list, id);
        return Object.assign(list, { item });
    };
    return Object.assign(pool, { list });
};
