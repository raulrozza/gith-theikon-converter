import { CalendarDate } from './@types/Calendar';
import { makeCalendarManager } from './factories/makeCalendarManager';
import yargs from 'yargs';
import { CommandValidation } from './validation/CommandValidation';

const convert = (date: CalendarDate, type: 'gith' | 'theikon') => {
    const manager = makeCalendarManager(type);
    const resultManager = makeCalendarManager(
        type === 'gith' ? 'theikon' : 'gith',
    );

    const result = manager.convert(date);

    return resultManager.printDate(result);
};

const [calendar, day, month, year] = yargs.command(
    '$0 [convert]',
    'convert date',
).argv._;

try {
    CommandValidation.validateSync({ calendar, day, month, year });

    const date = convert(
        {
            day: Number(day),
            month: String(month),
            year: Number(year),
        },
        calendar as 'gith' | 'theikon',
    );

    console.log(date);
} catch (error: any) {
    console.error(
        `${error.message}. Try \`yarn convert [calendar] [day] [month] [year]`,
    );
}
