"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const Item_1 = require("./Item");
describe('Item', () => {
    const list = {
        doer: {},
        table: 'table',
        item: sinon_1.default.spy(),
        count: sinon_1.default.spy(),
        select: sinon_1.default.spy(),
        insert: sinon_1.default.spy(),
        update: sinon_1.default.spy(),
        replace: sinon_1.default.spy(),
        remove: sinon_1.default.spy()
    };
    const item = new Item_1.Item(list, 'id');
    it('should exist', () => {
        list.count = sinon_1.default.spy(() => Promise.resolve(1));
        return item
            .has(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(true);
            (0, chai_1.expect)(list.count.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.count.calledWith({ id: 123 }, 1)).to.equal(true);
        });
    });
    it('should not exist', () => {
        list.count = sinon_1.default.spy(() => Promise.resolve(0));
        return item
            .has(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.count.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.count.calledWith({ id: 123 }, 1)).to.equal(true);
        });
    });
    it('should select', () => {
        const entry = {};
        list.select = sinon_1.default.spy(() => Promise.resolve([entry]));
        return item
            .get(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(entry);
            (0, chai_1.expect)(list.select.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.select.calledWith(undefined, { id: 123 }, 1)).to.equal(true);
        });
    });
    it('should not select', () => {
        list.select = sinon_1.default.spy(() => Promise.resolve([]));
        return item
            .get(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(undefined);
            (0, chai_1.expect)(list.select.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.select.calledWith(undefined, { id: 123 }, 1)).to.equal(true);
        });
    });
    it('should update', () => {
        const data = {};
        list.update = sinon_1.default.spy(() => Promise.resolve(1));
        return item
            .mod(123, data)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(true);
            (0, chai_1.expect)(list.update.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.update.calledWith(data, { id: 123 }, 1)).to.equal(true);
        });
    });
    it('should update empty', () => {
        list.update = sinon_1.default.spy(() => Promise.resolve(0));
        return item
            .mod(123, {})
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.update.args).to.deep.equal([[{}, { id: 123 }, 1]]);
        });
    });
    it('should not update', () => {
        const data = {};
        list.update = sinon_1.default.spy(() => Promise.resolve(0));
        return item
            .mod(123, data)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.update.args).to.deep.equal([[data, { id: 123 }, 1]]);
        });
    });
    it('should replace', () => {
        list.replace = sinon_1.default.spy(() => Promise.resolve(1));
        return item
            .set(123, { name: 'value' })
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(true);
            (0, chai_1.expect)(list.replace.args).to.deep.equal([[{ id: 123, name: 'value' }]]);
        });
    });
    it('should replace empty', () => {
        list.replace = sinon_1.default.spy(() => Promise.resolve(1));
        return item
            .set(123, {})
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(true);
            (0, chai_1.expect)(list.replace.args).to.deep.equal([[{ id: 123 }]]);
        });
    });
    it('should insert', () => {
        list.insert = sinon_1.default.spy(() => Promise.resolve(undefined));
        return item
            .add(123, { name: 'value' })
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.insert.args).to.deep.equal([[{ name: 'value', id: 123 }]]);
        });
    });
    it('should insert empty', () => {
        list.insert = sinon_1.default.spy(() => Promise.resolve(undefined));
        return item
            .add(123, {})
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.insert.args).to.deep.equal([[{ id: 123 }]]);
        });
    });
    it('should remove', () => {
        list.remove = sinon_1.default.spy(() => Promise.resolve(1));
        return item
            .rid(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(true);
            (0, chai_1.expect)(list.remove.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.remove.calledWith({ id: 123 }, 1)).to.equal(true);
        });
    });
    it('should not remove', () => {
        list.remove = sinon_1.default.spy(() => Promise.resolve(0));
        return item
            .rid(123)
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(false);
            (0, chai_1.expect)(list.remove.calledOnce).to.equal(true);
            (0, chai_1.expect)(list.remove.calledWith({ id: 123 }, 1)).to.equal(true);
        });
    });
    describe('append', () => {
        const data = { name: 'value' };
        it('should append on first try', () => {
            const generate = sinon_1.default.spy((count) => 1);
            list.insert = sinon_1.default.spy(() => Promise.resolve(1));
            return item
                .append(data, generate)
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
                (0, chai_1.expect)(generate.calledOnce).to.equal(true);
                (0, chai_1.expect)(generate.calledWith(32)).to.equal(true);
                (0, chai_1.expect)(list.insert.calledOnce).to.equal(true);
                (0, chai_1.expect)(list.insert.calledWith(Object.assign(Object.assign({}, data), { id: 1 }))).to.equal(true);
            });
        });
        it('should append on last try', () => {
            const generate = sinon_1.default.spy((generate) => generate);
            list.insert = sinon_1.default.spy(({ id }) => id ? Promise.reject({ code: 'ER_DUP_ENTRY' }) : Promise.resolve(1));
            return item
                .append(data, generate)
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(0);
                (0, chai_1.expect)(generate.callCount).to.equal(33);
                (0, chai_1.expect)(generate.firstCall.args).to.deep.equal([32]);
                (0, chai_1.expect)(generate.lastCall.args).to.deep.equal([0]);
                (0, chai_1.expect)(list.insert.callCount).to.equal(33);
            });
        });
        it('should not append', () => {
            const generate = sinon_1.default.spy(() => 1);
            list.insert = sinon_1.default.spy(() => Promise.reject({ code: 'ER_DUP_ENTRY' }));
            return item
                .append(data, generate)
                .then(() => {
                (0, chai_1.expect)(false).to.equal(true);
            }, (issue) => {
                (0, chai_1.expect)(issue).to.be.instanceOf(Error);
                (0, chai_1.expect)(issue.message).to.equal('out of bounce');
                (0, chai_1.expect)(generate.callCount).to.equal(33);
                (0, chai_1.expect)(generate.firstCall.args).to.deep.equal([32]);
                (0, chai_1.expect)(generate.lastCall.args).to.deep.equal([0]);
                (0, chai_1.expect)(list.insert.callCount).to.equal(33);
            });
        });
        it('should have 3 attempts', () => {
            const generate = sinon_1.default.spy(() => 1);
            list.insert = sinon_1.default.spy(() => Promise.reject({ code: 'ER_DUP_ENTRY' }));
            return item
                .append(data, generate, 3)
                .then(() => {
                (0, chai_1.expect)(false).to.equal(true);
            }, (issue) => {
                (0, chai_1.expect)(issue).to.be.instanceOf(Error);
                (0, chai_1.expect)(issue.message).to.equal('out of bounce');
                (0, chai_1.expect)(generate.callCount).to.equal(4);
                (0, chai_1.expect)(generate.firstCall.args).to.deep.equal([3]);
                (0, chai_1.expect)(generate.lastCall.args).to.deep.equal([0]);
                (0, chai_1.expect)(list.insert.callCount).to.equal(4);
            });
        });
        it('should forward unexpected error', () => {
            const generate = sinon_1.default.spy(() => 1);
            const error = new Error();
            list.insert = sinon_1.default.spy(() => Promise.reject(error));
            return item
                .append(data, generate, 3)
                .then(() => {
                (0, chai_1.expect)(false).to.equal(true);
            }, (issue) => {
                (0, chai_1.expect)(issue).to.be.equal(error);
            });
        });
        it('should forward undefined rejection', () => {
            const generate = sinon_1.default.spy(() => 1);
            list.insert = sinon_1.default.spy(() => Promise.reject());
            return item
                .append(data, generate, 3)
                .then(() => {
                (0, chai_1.expect)(false).to.equal(true);
            }, (issue) => {
                (0, chai_1.expect)(issue).to.equal(undefined);
            });
        });
    });
});
