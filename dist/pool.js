"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xdevapi_1 = __importDefault(require("@mysql/xdevapi"));
exports.default = (options) => {
    const client = xdevapi_1.default.getClient(Object.assign(Object.assign({}, options), { schema: options.schema || options.database, pooling: {
            enabled: true,
            maxSize: 1,
            maxIdleTime: 1000,
            queueTimeout: 2000
        } }));
    return () => client.getSession();
};
