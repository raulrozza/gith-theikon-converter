type Name = string;
type Days = number;
type LeapMonth = boolean;

export type Month = [Name, Days] | [Name, Days, LeapMonth];

export interface Calendar {
  reference: number;
  months: Month[];
  postFix: string;
}

export interface CalendarDate {
  day: number;
  month: string;
  year: number;
}
