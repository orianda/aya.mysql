"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(list, id) {
        this.list = list;
        this.id = id;
    }
    has(id) {
        return this.list
            .count({ [this.id]: id }, 1)
            .then((result) => result > 0);
    }
    get(id) {
        return this.list
            .select(undefined, { [this.id]: id }, 1)
            .then((result) => result[0]);
    }
    set(id, data) {
        return this
            .rid(id)
            .then(() => this.add(id, data));
    }
    add(id, data = {}) {
        data[this.id] = id;
        return this.list
            .insert(data);
    }
    mod(id, data) {
        return this.list
            .update(data, { [this.id]: id }, 1)
            .then((amount) => amount > 0);
    }
    rid(id) {
        return this.list
            .remove({ [this.id]: id }, 1)
            .then((result) => result > 0);
    }
    append(data, generate, bounces = 32) {
        const id = generate(bounces);
        return this
            .add(id, data)
            .then(() => id, (error) => {
            if ((error === null || error === void 0 ? void 0 : error.code) !== 'ER_DUP_ENTRY') {
                return Promise.reject(error);
            }
            else if (bounces > 0) {
                return this.append(data, generate, bounces - 1);
            }
            else {
                const error = new Error('out of bounce');
                return Promise.reject(error);
            }
        });
    }
}
exports.default = Item;
