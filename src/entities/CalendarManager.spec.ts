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
        reference: 2000,
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

    describe('getDate', () => {
        it('should return the expected date in a non leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 0);

            expect(manager.getDate(1, false)).toEqual({
                day: 1,
                month: 'January',
                year: 2000,
            });
            expect(manager.getDate(31, false)).toEqual({
                day: 31,
                month: 'January',
                year: 2000,
            });
            expect(manager.getDate(45, false)).toEqual({
                day: 14,
                month: 'February',
                year: 2000,
            });
            expect(manager.getDate(3808, false)).toEqual({
                day: 7,
                month: 'June',
                year: 2010,
            });
            expect(manager.getDate(-1, false)).toEqual({
                day: 31,
                month: 'December',
                year: 1999,
            });
            expect(manager.getDate(-31, false)).toEqual({
                day: 1,
                month: 'December',
                year: 1999,
            });
            expect(manager.getDate(-45, false)).toEqual({
                day: 17,
                month: 'November',
                year: 1999,
            });
            expect(manager.getDate(-3808, true)).toEqual({
                day: 27,
                month: 'July',
                year: 1989,
            });
        });

        it('should return the expected date in a leap calendar', () => {
            const manager = new CalendarManagerImplementation(calendar, 4);

            expect(manager.getDate(1, true)).toEqual({
                day: 1,
                month: 'January',
                year: 2000,
            });
            expect(manager.getDate(31, true)).toEqual({
                day: 31,
                month: 'January',
                year: 2000,
            });
            expect(manager.getDate(45, true)).toEqual({
                day: 14,
                month: 'February',
                year: 2000,
            });
            expect(manager.getDate(3808, true)).toEqual({
                day: 4,
                month: 'June',
                year: 2010,
            });
            expect(manager.getDate(-1, false)).toEqual({
                day: 31,
                month: 'December',
                year: 1999,
            });
            expect(manager.getDate(-31, false)).toEqual({
                day: 1,
                month: 'December',
                year: 1999,
            });
            expect(manager.getDate(-45, false)).toEqual({
                day: 17,
                month: 'November',
                year: 1999,
            });
            expect(manager.getDate(-3808, true)).toEqual({
                day: 29,
                month: 'July',
                year: 1989,
            });
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
