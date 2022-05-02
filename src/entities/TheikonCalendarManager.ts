import { CalendarDate } from '../@types/Calendar';
import { THEIKON_CALENDAR } from '../constants/calendars';
import { CalendarManager } from './CalendarManager';

export class TheikonCalendarManager extends CalendarManager {
    constructor() {
        super(THEIKON_CALENDAR, 0);
    }

    public convert(date: CalendarDate): CalendarDate {
        return date;
    }
}
