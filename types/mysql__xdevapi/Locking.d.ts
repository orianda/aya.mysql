export interface Locking {

  lockExclusive(mode?: LockContention): this;

  lockShared(mode?: LockContention): this;
}

export enum LockContention {
  NOWAIT = 0,
  SKIP_LOCKED = 1
}
