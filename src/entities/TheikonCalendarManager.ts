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
            days += this.getDaysInYear(i, false);
        }
        days += this.getDaysInCurrentYear(day, month, year, false);

        return days;
    }

    private getDaysFromReferenceYearBackward({
        day,
        month,
        year,
    }: CalendarDate): number {
        let days = 0;
        for (let i = this.calendar.reference - 1; i > year; i--) {
            days += this.getDaysInYear(i, false);
        }

        const totalDaysInYear = this.getDaysInYear(year, false);
        const daysInCurrentYear = this.getDaysInCurrentYear(
            day,
            month,
            year,
            false,
        );
        const remainingDaysInYearBackward =
            totalDaysInYear - daysInCurrentYear + 1;

        return -(days + remainingDaysInYearBackward);
    }

    private getDateFromGithCalendar(
        daysFromReferenceYear: number,
    ): CalendarDate {
        const manager = new GithCalendarManager();

        return manager.getDate(daysFromReferenceYear, true);
    }

    public printDate(date: CalendarDate<string>): string {
        const monthIndex = this.calendar.months.findIndex(
            ([name]) => name === date.month,
        );
        const quarter = Math.ceil((monthIndex + 1) / 4);

        return `${date.day} ${date.month}, ${quarter}/4 ${date.year} ${this.calendar.postFix}`;
    }
}
