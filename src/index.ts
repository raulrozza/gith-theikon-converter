import { CalendarDate } from './@types/Calendar';
import { makeCalendarManager } from './factories/makeCalendarManager';
import yargs from 'yargs';
import { CommandValidation } from './validation/CommandValidation';
import { capitalize } from 'lodash';

type CalendarType = 'gith' | 'theikon';

const convert = (
    date: CalendarDate,
    calendar: CalendarType,
    target: CalendarType,
) => {
    const manager = makeCalendarManager(calendar);
    const targetManager = makeCalendarManager(target);

    if (calendar === target) return manager.printDate(date);

    const result = manager.convert(date);

    return targetManager.printDate(result);
};

const [calendar, target, day, month, year] = yargs.command(
    '$0 [convert]',
    'convert date',
).argv._;

try {
    CommandValidation.validateSync({ calendar, target, day, month, year });

    const date = convert(
        {
            day: Number(day),
            month: capitalize(String(month).replaceAll('_', ' ')),
            year: Number(year),
        },
        calendar as CalendarType,
        target as CalendarType,
    );

    console.log(date);
} catch (error: any) {
    console.error(
        `${capitalize(
            error.message,
        )}. Try \`yarn convert [calendar] [target] [day] [month] [year]`,
    );
}
