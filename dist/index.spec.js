"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _1 = require(".");
const Item_1 = require("./Item");
const List_1 = require("./List");
const Pool_1 = require("./Pool");
describe('index', () => {
    const srv = { Pool: _1.Pool, List: _1.List, Item: _1.Item };
    const lib = {
        Pool: Pool_1.Pool,
        List: List_1.List,
        Item: Item_1.Item
    };
    Object
        .keys(srv)
        .forEach((name) => {
        it(`should have ${name}`, () => {
            (0, chai_1.expect)(srv[name]).to.equal(lib[name]);
        });
    });
});
