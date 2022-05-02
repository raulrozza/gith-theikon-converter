import { Calendar, CalendarDate } from '../@types/Calendar';

export abstract class CalendarManager {
    constructor(
        protected calendar: Calendar,
        protected leapYearInterval: number,
    ) {}

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

    public getDate(
        daysSinceReferenceYear: number,
        hasLeapYear: boolean,
    ): CalendarDate {
        let days = daysSinceReferenceYear;

        let year = this.calendar.reference;
        while (true) {
            const yearDays = this.getDaysInYear(year, hasLeapYear);

            if (days < yearDays) break;

            days -= yearDays;

            year++;
        }

        for (let i = 0; i < this.calendar.months.length; i++) {
            const [month, daysInMonth, leap] = this.calendar.months[i];

            const isLeapYear = hasLeapYear
                ? year % this.leapYearInterval === 0
                : false;

            const actualDaysInMonth =
                daysInMonth + (leap && isLeapYear ? 1 : 0);

            if (actualDaysInMonth >= days) {
                return {
                    day: days,
                    month,
                    year,
                };
            }

            days -= actualDaysInMonth;
        }

        throw new Error('Invalid date');
    }

    public printDate(date: CalendarDate): string {
        return `${date.day} ${date.month}, ${date.year} ${this.calendar.postFix}`;
    }

    public abstract convert(date: CalendarDate): CalendarDate;
}
