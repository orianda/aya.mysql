import {expect} from "chai";
import sinon, {SinonSpy} from "sinon";
import {ValueDto} from "aya.mysql.querylizer";
import {Doer} from "./Doer";
import {Item} from "./Item";
import {List} from "./List";

describe('Item', () => {
  const list: {
    doer: Doer;
    table: string;
    item: SinonSpy;
    count: SinonSpy,
    select: SinonSpy,
    insert: SinonSpy,
    update: SinonSpy,
    replace: SinonSpy,
    remove: SinonSpy
  } = {
    doer: {} as Doer,
    table: 'table',
    item: sinon.spy(),
    count: sinon.spy(),
    select: sinon.spy(),
    insert: sinon.spy(),
    update: sinon.spy(),
    replace: sinon.spy(),
    remove: sinon.spy()
  };
  const item = new Item<'id', Record<string, ValueDto>>(list as unknown as List<Record<string, ValueDto>>, 'id');

  it('should exist', () => {
    list.count = sinon.spy(() => Promise.resolve(1));
    return item
      .has(123)
      .then((issue) => {
        expect(issue).to.equal(true);
        expect(list.count.calledOnce).to.equal(true);
        expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
      });
  });

  it('should not exist', () => {
    list.count = sinon.spy(() => Promise.resolve(0));
    return item
      .has(123)
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.count.calledOnce).to.equal(true);
        expect(list.count.calledWith({id: 123}, 1)).to.equal(true);
      });
  });

  it('should select', () => {
    const entry = {};
    list.select = sinon.spy(() => Promise.resolve([entry]));
    return item
      .get(123)
      .then((issue) => {
        expect(issue).to.equal(entry);
        expect(list.select.calledOnce).to.equal(true);
        expect(list.select.calledWith(undefined, {id: 123}, 1)).to.equal(true);
      });
  });

  it('should not select', () => {
    list.select = sinon.spy(() => Promise.resolve([]));
    return item
      .get(123)
      .then((issue) => {
        expect(issue).to.equal(undefined);
        expect(list.select.calledOnce).to.equal(true);
        expect(list.select.calledWith(undefined, {id: 123}, 1)).to.equal(true);
      });
  });

  it('should update', () => {
    const data = {};
    list.update = sinon.spy(() => Promise.resolve(1));
    return item
      .mod(123, data)
      .then((issue) => {
        expect(issue).to.equal(true);
        expect(list.update.calledOnce).to.equal(true);
        expect(list.update.calledWith(data, {id: 123}, 1)).to.equal(true);
      });
  });

  it('should update empty', () => {
    list.update = sinon.spy(() => Promise.resolve(0));
    return item
      .mod(123, {})
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.update.args).to.deep.equal([[{}, {id: 123}, 1]]);
      });
  });

  it('should not update', () => {
    const data = {};
    list.update = sinon.spy(() => Promise.resolve(0));
    return item
      .mod(123, data)
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.update.args).to.deep.equal([[data, {id: 123}, 1]]);
      });
  });

  it('should replace', () => {
    list.replace = sinon.spy(() => Promise.resolve(1));
    return item
      .set(123, {name: 'value'})
      .then((issue) => {
        expect(issue).to.equal(true);
        expect(list.replace.args).to.deep.equal([[{id: 123, name: 'value'}]]);
      });
  });

  it('should replace empty', () => {
    list.replace = sinon.spy(() => Promise.resolve(1));
    return item
      .set(123, {})
      .then((issue) => {
        expect(issue).to.equal(true);
        expect(list.replace.args).to.deep.equal([[{id: 123}]]);
      });
  });

  it('should insert', () => {
    list.insert = sinon.spy(() => Promise.resolve(undefined));
    return item
      .add(123, {name: 'value'})
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.insert.args).to.deep.equal([[{name: 'value', id: 123}]]);
      });
  });

  it('should insert empty', () => {
    list.insert = sinon.spy(() => Promise.resolve(undefined));
    return item
      .add(123, {})
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.insert.args).to.deep.equal([[{id: 123}]]);
      });
  });

  it('should remove', () => {
    list.remove = sinon.spy(() => Promise.resolve(1));
    return item
      .rid(123)
      .then((issue) => {
        expect(issue).to.equal(true);
        expect(list.remove.calledOnce).to.equal(true);
        expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
      });
  });

  it('should not remove', () => {
    list.remove = sinon.spy(() => Promise.resolve(0));
    return item
      .rid(123)
      .then((issue) => {
        expect(issue).to.equal(false);
        expect(list.remove.calledOnce).to.equal(true);
        expect(list.remove.calledWith({id: 123}, 1)).to.equal(true);
      });
  });

  describe('append', () => {
    const data = {name: 'value'};

    it('should append on first try', () => {
      const generate = sinon.spy((count: number) => 1);
      list.insert = sinon.spy(() => Promise.resolve(1));
      return item
        .append(data, generate)
        .then((issue) => {
          expect(issue).to.equal(1);
          expect(generate.calledOnce).to.equal(true);
          expect(generate.calledWith(32)).to.equal(true);
          expect((list.insert as SinonSpy).calledOnce).to.equal(true);
          expect((list.insert as SinonSpy).calledWith({...data, id: 1})).to.equal(true);
        });
    });

    it('should append on last try', () => {
      const generate = sinon.spy((generate) => generate);
      list.insert = sinon.spy(({id}) => id ? Promise.reject({code: 'ER_DUP_ENTRY'}) : Promise.resolve(1));
      return item
        .append(data, generate)
        .then((issue) => {
          expect(issue).to.equal(0);
          expect(generate.callCount).to.equal(33);
          expect(generate.firstCall.args).to.deep.equal([32]);
          expect(generate.lastCall.args).to.deep.equal([0]);
          expect((list.insert as SinonSpy).callCount).to.equal(33);
        });
    });

    it('should not append', () => {
      const generate = sinon.spy(() => 1);
      list.insert = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
      return item
        .append(data, generate)
        .then(() => {
          expect(false).to.equal(true);
        }, (issue: Error) => {
          expect(issue).to.be.instanceOf(Error);
          expect(issue.message).to.equal('out of bounce');
          expect(generate.callCount).to.equal(33);
          expect(generate.firstCall.args).to.deep.equal([32]);
          expect(generate.lastCall.args).to.deep.equal([0]);
          expect((list.insert as SinonSpy).callCount).to.equal(33);
        });
    });

    it('should have 3 attempts', () => {
      const generate = sinon.spy(() => 1);
      list.insert = sinon.spy(() => Promise.reject({code: 'ER_DUP_ENTRY'}));
      return item
        .append(data, generate, 3)
        .then(() => {
          expect(false).to.equal(true);
        }, (issue: Error) => {
          expect(issue).to.be.instanceOf(Error);
          expect(issue.message).to.equal('out of bounce');
          expect(generate.callCount).to.equal(4);
          expect(generate.firstCall.args).to.deep.equal([3]);
          expect(generate.lastCall.args).to.deep.equal([0]);
          expect((list.insert as SinonSpy).callCount).to.equal(4);
        });
    });

    it('should forward unexpected error', () => {
      const generate = sinon.spy(() => 1);
      const error = new Error();
      list.insert = sinon.spy(() => Promise.reject(error));
      return item
        .append(data, generate, 3)
        .then(() => {
          expect(false).to.equal(true);
        }, (issue: Error) => {
          expect(issue).to.be.equal(error);
        });
    });

    it('should forward undefined rejection', () => {
      const generate = sinon.spy(() => 1);
      list.insert = sinon.spy(() => Promise.reject());
      return item
        .append(data, generate, 3)
        .then(() => {
          expect(false).to.equal(true);
        }, (issue: Error) => {
          expect(issue).to.be.equal(undefined);
        });
    });
  });
});
