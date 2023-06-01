"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon_1 = __importDefault(require("sinon"));
const Item_1 = require("./Item");
const List_1 = require("./List");
(0, mocha_1.describe)('List', () => {
    const doer = {
        pool: {},
        list: sinon_1.default.spy(() => undefined),
        count: sinon_1.default.spy(() => Promise.resolve(0)),
        select: sinon_1.default.spy(() => Promise.resolve([])),
        insert: sinon_1.default.spy(() => Promise.resolve(1)),
        update: sinon_1.default.spy(() => Promise.resolve(2)),
        replace: sinon_1.default.spy(() => Promise.resolve(3)),
        remove: sinon_1.default.spy(() => Promise.resolve(4)),
        submit: sinon_1.default.spy(() => Promise.resolve())
    };
    const list = new List_1.List(doer, 'table');
    it('should be a list', () => {
        (0, chai_1.expect)(list).to.be.instanceOf(List_1.List);
    });
    (0, mocha_1.describe)('item', () => {
        it('should have item property', () => {
            (0, chai_1.expect)(typeof list.item).to.equal('function');
        });
        it('should create item', () => {
            const item = list.item('id');
            (0, chai_1.expect)(item).to.be.instanceof(Item_1.Item);
        });
        it('should have id', () => {
            const item = list.item('id');
            (0, chai_1.expect)(item.id).to.equal('id');
        });
    });
    (0, mocha_1.describe)('count', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.count = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .count({ name: 'value' }, 10, 5)
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .count({ name: 'value' }, 10, 5)
                .then(() => {
                (0, chai_1.expect)(doer.count.args).to.deep.equal([['SELECT COUNT(*) AS `amount` FROM `table` WHERE `name` = "value" LIMIT 5, 10']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.count = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .count()
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .count()
                .then(() => {
                (0, chai_1.expect)(doer.count.args).to.deep.equal([['SELECT COUNT(*) AS `amount` FROM `table`']]);
            }));
        });
    });
    (0, mocha_1.describe)('select', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.select = sinon_1.default.spy(() => Promise.resolve([{ column: 'value' }]));
            });
            it('should fetch', () => list
                .select(['name'], { name: 'value' }, 10, 5, ['name'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.deep.equal([{ column: 'value' }]);
            }));
            it('should forward query', () => list
                .select(['name'], { name: 'value' }, 10, 5, ['name'])
                .then(() => {
                (0, chai_1.expect)(doer.select.args).to.deep.equal([['SELECT `name` FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.select = sinon_1.default.spy(() => Promise.resolve([{ column: 'value' }]));
            });
            it('should fetch', () => list
                .select()
                .then((issue) => {
                (0, chai_1.expect)(issue).to.deep.equal([{ column: 'value' }]);
            }));
            it('should forward query', () => list
                .select()
                .then(() => {
                (0, chai_1.expect)(doer.select.args).to.deep.equal([['SELECT * FROM `table`']]);
            }));
        });
    });
    (0, mocha_1.describe)('insert', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.insert = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .insert({ name: 'value' })
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .insert({ name: 'value' })
                .then(() => {
                (0, chai_1.expect)(doer.insert.args).to.deep.equal([['INSERT INTO `table` SET `name` = "value"']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.insert = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .insert({})
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .insert({})
                .then(() => {
                (0, chai_1.expect)(doer.insert.args).to.deep.equal([['INSERT INTO `table` () VALUES ()']]);
            }));
        });
    });
    (0, mocha_1.describe)('update', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.update = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .update({ name: 'value' }, { name: 'equal' }, 10, 5, ['name'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .update({ name: 'value' }, { name: 'equal' }, 10, 5, ['name'])
                .then(() => {
                (0, chai_1.expect)(doer.update.args).to.deep.equal([['UPDATE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.update = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .update({})
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(0);
            }));
            it('should forward query', () => list
                .update({})
                .then(() => {
                (0, chai_1.expect)(doer.update.args).to.deep.equal([]);
            }));
        });
    });
    (0, mocha_1.describe)('replace', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.replace = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .replace({ name: 'value' }, { name: 'equal' }, 10, 5, ['name'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .replace({ name: 'value' }, { name: 'equal' }, 10, 5, ['name'])
                .then(() => {
                (0, chai_1.expect)(doer.replace.args).to.deep.equal([['REPLACE `table` SET `name` = "value" WHERE `name` = "equal" ORDER BY `name` ASC LIMIT 5, 10']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.replace = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .replace({})
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(0);
            }));
            it('should forward query', () => list
                .replace({})
                .then(() => {
                (0, chai_1.expect)(doer.replace.args).to.deep.equal([]);
            }));
        });
    });
    (0, mocha_1.describe)('remove', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                doer.remove = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .remove({ name: 'value' }, 10, 5, ['name'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .remove({ name: 'value' }, 10, 5, ['name'])
                .then(() => {
                (0, chai_1.expect)(doer.remove.args).to.deep.equal([['DELETE FROM `table` WHERE `name` = "value" ORDER BY `name` ASC LIMIT 5, 10']]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                doer.remove = sinon_1.default.spy(() => Promise.resolve(1));
            });
            it('should fetch', () => list
                .remove()
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(1);
            }));
            it('should forward query', () => list
                .remove()
                .then(() => {
                (0, chai_1.expect)(doer.remove.args).to.deep.equal([['DELETE FROM `table`']]);
            }));
        });
    });
});
