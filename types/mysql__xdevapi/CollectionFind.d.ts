import {Binding} from "./Binding";
import {Grouping} from "./Grouping";
import {Skipping} from "./Skipping";
import {Locking} from "./Locking";
import {CollectionOrdering} from "./CollectionOrdering";
import {Projecting} from "./Projecting";
import {Query} from "./Query";
import {DocResult} from "./DocResult";
import {DocumentCursor} from "./DocumentCursor";

export interface CollectionFind extends Binding, Grouping, Skipping, Locking, CollectionOrdering, Projecting, Query {

  execute(dataCursor?: DocumentCursor): Promise<DocResult>;

  fields(projections: ReadonlyArray<string>): this;

  fields(...projections: ReadonlyArray<string>): this;
}
