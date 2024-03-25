export enum Millisecond {
  MINUTE = 60e3,
  HOUR = Millisecond.MINUTE * 60,
  DAY = Millisecond.HOUR * 24,
  WEEK = Millisecond.DAY * 7,
  MONTH = Millisecond.DAY * 30,
  YEAR = Millisecond.DAY * 365,
}
