import { CalendarDate } from '../@types/Calendar';
import { GITH_CALENDAR } from '../constants/calendars';
import { CalendarManager } from './CalendarManager';

const LEAP_YEAR_INTERVAL = 4;

export class GithCalendarManager extends CalendarManager {
    constructor() {
        super(GITH_CALENDAR, LEAP_YEAR_INTERVAL);
    }

    public convert(date: CalendarDate): CalendarDate {
        const daysSinceYearOne = this.getGithDaysFromYearOne(date);

        return date;
    }

    private getGithDaysFromYearOne({ day, month, year }: CalendarDate): number {
        let days = 0;
        for (let i = 1; i < year; i++) {
            days += this.getDaysInYear(i, true);
        }
        // add the days from the current month
        days += this.getDaysInCurrentYear(day, month, year, true);

        return days;
    }
}
