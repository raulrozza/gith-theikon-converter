import { Calendar } from '../@types/Calendar';
import { CalendarManager } from './CalendarManager';

class CalendarManagerImplementation extends CalendarManager {
    constructor(calendar: Calendar, leapYearInterval: number) {
        super(calendar, leapYearInterval);
    }

    public convert = jest.fn();
}

describe('CalendarManager', () => {
    const calendar: Calendar = {
        reference: 0,
        postFix: 'Postfix',
        months: [
            ['January', 31],
            ['February', 28, true],
            ['March', 31],
            ['April', 30],
            ['May', 31],
            ['June', 30],
            ['July', 31],
            ['August', 31],
            ['September', 30],
            ['October', 31],
            ['November', 30],
            ['December', 31],
        ],
    };

    describe('daysInYear', () => {
        it('should return the correct number of days in a non leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 0);

            expect(manager.getDaysInYear(2018, false)).toBe(365);
        });

        it('should return the correct number of days in a leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 4);

            expect(manager.getDaysInYear(2016, true)).toBe(366);
            expect(manager.getDaysInYear(2019, true)).toBe(365);
        });
    });

    describe('getDaysInCurrentYear', () => {
        it('should return the correct number of days in a non leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 0);

            expect(
                manager.getDaysInCurrentYear(1, 'January', 2018, false),
            ).toBe(1);
            expect(manager.getDaysInCurrentYear(17, 'June', 2018, false)).toBe(
                168,
            );
        });

        it('should return the correct number of days in a leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 4);

            expect(manager.getDaysInCurrentYear(1, 'January', 2016, true)).toBe(
                1,
            );
            expect(manager.getDaysInCurrentYear(17, 'June', 2016, true)).toBe(
                169,
            );
            expect(manager.getDaysInCurrentYear(17, 'June', 2019, true)).toBe(
                168,
            );
        });
    });

    describe('printDate', () => {
        it('should print the expected date correctly', () => {
            const manager = new CalendarManagerImplementation(calendar, 0);

            expect(
                manager.printDate({ day: 1, month: 'January', year: 2018 }),
            ).toBe('1 January, 2018 Postfix');
            expect(
                manager.printDate({ day: 17, month: 'June', year: 2018 }),
            ).toBe('17 June, 2018 Postfix');
        });
    });
});
