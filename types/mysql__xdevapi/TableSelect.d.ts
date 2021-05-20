import {Binding} from "./Binding";
import {Grouping} from "./Grouping";
import {Locking} from "./Locking";
import {Skipping} from "./Skipping";
import {Projecting} from "./Projecting";
import {Query} from "./Query";
import {TableOrdering} from "./TableOrdering";
import {RowCursor} from "./RowCursor";
import {MetadataCursor} from "./MetadataCursor";
import {RowResult} from "./RowResult";

export interface TableSelect extends Binding, Grouping, Locking, Skipping, Projecting, Query, TableOrdering {

  execute(dataCursor?: RowCursor, metadataCursor?: MetadataCursor): Promise<RowResult>;
}
