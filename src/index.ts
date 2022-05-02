import { CalendarDate } from './@types/Calendar';
import { makeCalendarManager } from './factories/makeCalendarManager';

const convert = (date: CalendarDate, type: 'gith' | 'theikon') => {
  const manager = makeCalendarManager(type);

  return manager.convert(date);
};
