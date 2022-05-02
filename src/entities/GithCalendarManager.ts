import { CalendarDate } from '../@types/Calendar';
import { GITH_CALENDAR } from '../constants/calendars';
import { CalendarManager } from './CalendarManager';
import { TheikonCalendarManager } from './TheikonCalendarManager';

const LEAP_YEAR_INTERVAL = 4;

export class GithCalendarManager extends CalendarManager {
    constructor() {
        super(GITH_CALENDAR, LEAP_YEAR_INTERVAL);
    }

    public convert(date: CalendarDate): CalendarDate {
        const daysSinceReferenceYear = this.getDaysSinceReferenceYear(date);
        return this.getDateFromTheikonCalendar(daysSinceReferenceYear);
    }

    private getDaysSinceReferenceYear({
        day,
        month,
        year,
    }: CalendarDate): number {
        let days = 0;
        for (let i = this.calendar.reference; i < year; i++) {
            days += this.getDaysInYear(i, true);
        }
        days += this.getDaysInCurrentYear(day, month, year, true);

        return days;
    }

    private getDateFromTheikonCalendar(
        daysSinceReferenceYear: number,
    ): CalendarDate {
        const manager = new TheikonCalendarManager();

        return manager.getDate(daysSinceReferenceYear, false);
    }
}
