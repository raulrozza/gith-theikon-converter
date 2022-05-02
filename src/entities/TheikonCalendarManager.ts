import { CalendarDate } from '../@types/Calendar';
import { THEIKON_CALENDAR } from '../constants/calendars';
import { CalendarManager } from './CalendarManager';
import { GithCalendarManager } from './GithCalendarManager';

export class TheikonCalendarManager extends CalendarManager {
    constructor() {
        super(THEIKON_CALENDAR, 0);
    }

    public convert(date: CalendarDate): CalendarDate {
        const daysFromReferenceYear = this.getDaysFromReferenceYear(date);
        return this.getDateFromGithCalendar(daysFromReferenceYear);
    }

    private getDaysFromReferenceYear({
        day,
        month,
        year,
    }: CalendarDate): number {
        let days = 0;
        for (let i = this.calendar.reference; i < year; i++) {
            days += this.getDaysInYear(i, false);
        }
        days += this.getDaysInCurrentYear(day, month, year, false);

        return days;
    }

    private getDateFromGithCalendar(
        daysFromReferenceYear: number,
    ): CalendarDate {
        const manager = new GithCalendarManager();

        return manager.getDate(daysFromReferenceYear, true);
    }
}
