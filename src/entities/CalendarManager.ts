import { Calendar, CalendarDate } from '../@types/Calendar';

export abstract class CalendarManager {
    constructor(private calendar: Calendar, private leapYearInterval: number) {}

    public getDaysInYear(year: number, hasLeapYear: boolean): number {
        const isLeapYear = hasLeapYear
            ? year % this.leapYearInterval === 0
            : false;

        return this.calendar.months.reduce((days, month) => {
            const [, daysInMonth, leap] = month;

            days += daysInMonth;
            if (leap && isLeapYear) days += 1;

            return days;
        }, 0);
    }

    public getDaysInCurrentYear(
        day: number,
        month: string,
        year: number,
        hasLeapYear: boolean,
    ): number {
        const isLeapYear = hasLeapYear
            ? year % this.leapYearInterval === 0
            : false;

        const months = this.calendar.months;

        let days = 0;
        for (let i = 0; i < months.length; i++) {
            const [name, daysInMonth, leapMonth] = months[i];

            if (month === name) {
                days += day;
                break;
            }

            days += daysInMonth;
            if (leapMonth && isLeapYear) days += 1;
        }

        return days;
    }

    public printDate(date: CalendarDate): string {
        return `${date.day} ${date.month}, ${date.year} ${this.calendar.postFix}`;
    }

    public abstract convert(date: CalendarDate): CalendarDate;
}
