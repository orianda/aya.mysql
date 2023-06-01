"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon_1 = __importDefault(require("sinon"));
const Doer_1 = require("./Doer");
const List_1 = require("./List");
(0, mocha_1.describe)('Doer', () => {
    const pool = {
        schema: 'defaultSchema',
        config: {
            host: 'host',
            port: 123,
            user: 'user',
            password: 'password'
        },
        open: sinon_1.default.spy(() => Promise.resolve(session)),
        doer: sinon_1.default.spy(() => new Doer_1.Doer(pool))
    };
    const session = {
        sql: sinon_1.default.spy(() => execute),
        close: sinon_1.default.spy(() => Promise.resolve())
    };
    const execute = {
        bind: sinon_1.default.spy(() => execute),
        execute: sinon_1.default.spy(() => Promise.resolve(result))
    };
    const column = {
        getColumnName: sinon_1.default.spy(() => 'column')
    };
    const row = {
        toArray: sinon_1.default.spy(() => ['value'])
    };
    const result = {
        getAutoIncrementValue: sinon_1.default.spy(() => 1),
        getAffectedItemsCount: sinon_1.default.spy(() => 2),
        getColumns: sinon_1.default.spy(() => [column]),
        getResults: sinon_1.default.spy(() => []),
        toArray: sinon_1.default.spy(() => [])
    };
    const doer = new Doer_1.Doer(pool);
    it('should be a doer', () => {
        (0, chai_1.expect)(doer).to.be.instanceOf(Doer_1.Doer);
    });
    (0, mocha_1.describe)('list', () => {
        it('should have list property', () => {
            (0, chai_1.expect)(typeof doer.list).to.equal('function');
        });
        it('should create list', () => {
            const list = doer.list('table', 'schema');
            (0, chai_1.expect)(list).to.be.instanceof(List_1.List);
        });
        it('should have table', () => {
            const list = doer.list('table', 'schema');
            (0, chai_1.expect)(list.table).to.equal('table');
        });
        it('should have schema', () => {
            const list = doer.list('table', 'schema');
            (0, chai_1.expect)(list.schema).to.equal('schema');
        });
        it('should have default schema', () => {
            const list = doer.list('table');
            (0, chai_1.expect)(list.schema).to.equal('defaultSchema');
        });
    });
    (0, mocha_1.describe)('count', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
            result.toArray = sinon_1.default.spy(() => [[[0]]]);
        });
        it('should fetch', () => doer
            .count('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(0);
        }));
        it('should call sql', () => doer
            .count('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .count('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .count('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .count('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
    (0, mocha_1.describe)('select', () => {
        (0, mocha_1.describe)('exists', () => {
            beforeEach(() => {
                session.sql = sinon_1.default.spy(() => execute);
                execute.bind = sinon_1.default.spy(() => execute);
                result.getResults = sinon_1.default.spy(() => [[row]]);
            });
            it('should fetch', () => doer
                .select('query', ['value'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.deep.equal([{ column: 'value' }]);
            }));
            it('should call sql', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(session.sql.callCount).to.equal(1);
            }));
            it('should forward query', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
            }));
            it('should call bind', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
            }));
            it('should forward values', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
            }));
        });
        (0, mocha_1.describe)('empty', () => {
            beforeEach(() => {
                session.sql = sinon_1.default.spy(() => execute);
                execute.bind = sinon_1.default.spy(() => execute);
                result.getResults = sinon_1.default.spy(() => []);
            });
            it('should fetch', () => doer
                .select('query', ['value'])
                .then((issue) => {
                (0, chai_1.expect)(issue).to.deep.equal([]);
            }));
            it('should call sql', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(session.sql.callCount).to.equal(1);
            }));
            it('should forward query', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
            }));
            it('should call bind', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
            }));
            it('should forward values', () => doer
                .select('query', ['value'])
                .then(() => {
                (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
            }));
        });
    });
    (0, mocha_1.describe)('insert', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
        });
        it('should fetch', () => doer
            .insert('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(1);
        }));
        it('should call sql', () => doer
            .insert('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .insert('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .insert('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .insert('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
    (0, mocha_1.describe)('update', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
        });
        it('should fetch', () => doer
            .update('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(2);
        }));
        it('should call sql', () => doer
            .update('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .update('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .update('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .update('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
    (0, mocha_1.describe)('replace', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
        });
        it('should fetch', () => doer
            .replace('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(2);
        }));
        it('should call sql', () => doer
            .replace('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .replace('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .replace('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .replace('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
    (0, mocha_1.describe)('remove', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
        });
        it('should fetch', () => doer
            .remove('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(2);
        }));
        it('should call sql', () => doer
            .remove('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .remove('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .remove('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .remove('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
    });
    (0, mocha_1.describe)('submit', () => {
        beforeEach(() => {
            session.sql = sinon_1.default.spy(() => execute);
            execute.bind = sinon_1.default.spy(() => execute);
        });
        it('should fetch', () => doer
            .submit('query', ['value'])
            .then((issue) => {
            (0, chai_1.expect)(issue).to.equal(result);
        }));
        it('should call sql', () => doer
            .submit('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.callCount).to.equal(1);
        }));
        it('should forward query', () => doer
            .submit('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(session.sql.args).to.deep.equal([['query']]);
        }));
        it('should call bind', () => doer
            .submit('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.callCount).to.equal(1);
        }));
        it('should forward values', () => doer
            .submit('query', ['value'])
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[['value']]]);
        }));
        it('should fallback values', () => doer
            .submit('query')
            .then(() => {
            (0, chai_1.expect)(execute.bind.args).to.deep.equal([[[]]]);
        }));
        (0, mocha_1.describe)('fail', () => {
            (0, mocha_1.describe)('execute', () => {
                beforeEach(() => {
                    session.close = sinon_1.default.spy(() => Promise.resolve());
                    execute.execute = sinon_1.default.spy(() => Promise.reject('execute'));
                });
                it('should close', () => doer
                    .submit('query', ['value'])
                    .catch(() => {
                    (0, chai_1.expect)(session.close.callCount).to.equal(1);
                }));
                it('should fail', () => doer
                    .submit('query', ['value'])
                    .catch((error) => {
                    (0, chai_1.expect)(error).to.equal('execute');
                }));
            });
            (0, mocha_1.describe)('close', () => {
                beforeEach(() => {
                    session.close = sinon_1.default.spy(() => Promise.reject('close'));
                    execute.execute = sinon_1.default.spy(() => Promise.resolve(result));
                });
                it('should close', () => doer
                    .submit('query', ['value'])
                    .catch(() => {
                    (0, chai_1.expect)(session.close.callCount).to.equal(1);
                }));
                it('should fail', () => doer
                    .submit('query', ['value'])
                    .catch((error) => {
                    (0, chai_1.expect)(error).to.equal('close');
                }));
            });
        });
    });
});
