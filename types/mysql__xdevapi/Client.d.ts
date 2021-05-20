import {Session} from "./Session";

export interface Client {

  close(): Promise<void>;

  getSession(): Promise<Session>;
}
