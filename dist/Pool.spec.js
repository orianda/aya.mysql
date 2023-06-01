"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xdevapi_1 = __importDefault(require("@mysql/xdevapi"));
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon_1 = __importDefault(require("sinon"));
const Doer_1 = require("./Doer");
const Pool_1 = require("./Pool");
(0, mocha_1.describe)('Pool', () => {
    const session = {};
    let pool;
    beforeEach(() => {
        sinon_1.default
            .stub(xdevapi_1.default, 'getSession')
            .resolves(session);
        pool = new Pool_1.Pool({
            host: 'host',
            port: 123456,
            user: 'user',
            password: 'password',
            schema: 'schema'
        });
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    it('should be a pool', () => {
        (0, chai_1.expect)(pool).to.be.instanceOf(Pool_1.Pool);
    });
    (0, mocha_1.describe)('constructor', () => {
        it('should have schema', () => {
            (0, chai_1.expect)(pool.schema).to.equal('schema');
        });
        it('should have config', () => {
            (0, chai_1.expect)(pool.config).to.deep.equal({
                host: 'host',
                port: 123456,
                user: 'user',
                password: 'password'
            });
        });
    });
    (0, mocha_1.describe)('doer', () => {
        it('should create doer', () => {
            const doer = pool.doer();
            (0, chai_1.expect)(doer).to.be.instanceOf(Doer_1.Doer);
        });
    });
    (0, mocha_1.describe)('open', () => {
        it('should create session', () => {
            return pool
                .open()
                .then((issue) => {
                (0, chai_1.expect)(issue).to.equal(session);
            });
        });
    });
});
