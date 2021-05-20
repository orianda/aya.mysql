import {Session} from "./Session";

export interface DatabaseObject {

  getSession(): Session;
}
