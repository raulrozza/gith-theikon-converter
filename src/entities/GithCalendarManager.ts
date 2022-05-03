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
        const daysFromReferenceYear = this.getDaysFromReferenceYear(date);
        return this.getDateFromTheikonCalendar(daysFromReferenceYear);
    }

    private getDaysFromReferenceYear(date: CalendarDate): number {
        if (date.year >= this.calendar.reference)
            return this.getDaysFromReferenceYearForward(date);

        return this.getDaysFromReferenceYearBackward(date);
    }

    private getDaysFromReferenceYearForward({
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

    private getDaysFromReferenceYearBackward({
        day,
        month,
        year,
    }: CalendarDate): number {
        let days = 0;
        for (let i = this.calendar.reference - 1; i > year; i--) {
            days += this.getDaysInYear(i, true);
        }

        const totalDaysInYear = this.getDaysInYear(year, true);
        const daysInCurrentYear = this.getDaysInCurrentYear(
            day,
            month,
            year,
            true,
        );
        const remainingDaysInYearBackward =
            totalDaysInYear - daysInCurrentYear + 1;

        return -(days + remainingDaysInYearBackward);
    }

    private getDateFromTheikonCalendar(
        daysFromReferenceYear: number,
    ): CalendarDate {
        const manager = new TheikonCalendarManager();

        return manager.getDate(daysFromReferenceYear, false);
    }
}
