export interface Warning {
  level: WarningLevel;
  code: number;
  msg: string;
}

export enum WarningLevel {
  NOTE = 1,
  WARNING = 2,
  ERROR = 3
}
