import { CalendarManager } from '../entities/CalendarManager';
import { GithCalendarManager } from '../entities/GithCalendarManager';
import { TheikonCalendarManager } from '../entities/TheikonCalendarManager';

export function makeCalendarManager(type: 'gith' | 'theikon'): CalendarManager {
    if (type === 'gith') return new GithCalendarManager();

    if (type === 'theikon') return new TheikonCalendarManager();

    throw new Error('Invalid calendar');
}
