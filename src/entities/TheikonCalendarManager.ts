import { CalendarDate } from '../@types/Calendar';
import { THEIKON_CALENDAR } from '../constants/calendars';
import { CalendarManager } from './CalendarManager';
import { GithCalendarManager } from './GithCalendarManager';

export class TheikonCalendarManager extends CalendarManager {
    constructor() {
        super(THEIKON_CALENDAR, 0);
    }

    public convert(date: CalendarDate): CalendarDate {
        const daysSinceReferenceYear = this.getDaysSinceReferenceYear(date);
        return this.getDateFromGithCalendar(daysSinceReferenceYear);
    }

    private getDaysSinceReferenceYear({
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
        daysSinceReferenceYear: number,
    ): CalendarDate {
        const manager = new GithCalendarManager();

        return manager.getDate(daysSinceReferenceYear, true);
    }
}
