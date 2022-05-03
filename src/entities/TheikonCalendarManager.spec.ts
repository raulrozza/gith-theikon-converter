import { TheikonCalendarManager } from './TheikonCalendarManager';

describe('TheikonCalendarManager', () => {
    const manager = new TheikonCalendarManager();

    it('should convert the positive dates correctly to gith dates', () => {
        expect(
            manager.convert({
                day: 1,
                month: 'Tosaigh',
                year: 885,
            }),
        ).toEqual({
            day: 1,
            month: 'Empeço',
            year: 865,
        });

        expect(
            manager.convert({
                day: 83,
                month: 'Deirant',
                year: 885,
            }),
        ).toEqual({
            day: 17,
            month: 'Nono',
            year: 868,
        });

        expect(
            manager.convert({
                day: 57,
                month: 'Dosaigh',
                year: 894,
            }),
        ).toEqual({
            day: 25,
            month: 'Quinto',
            year: 901,
        });
    });

    it('should convert dates correctly even from below the gith calendar reference', () => {
        expect(
            manager.convert({
                day: 94,
                month: 'Deireadh',
                year: 668,
            }),
        ).toEqual({
            day: 31,
            month: 'Mês da Virada',
            year: 0,
        });

        expect(
            manager.convert({
                day: 1,
                month: 'Tosaigh',
                year: 668,
            }),
        ).toEqual({
            day: 1,
            month: 'Empeço',
            year: -3,
        });

        expect(
            manager.convert({
                day: 83,
                month: 'Donn',
                year: 665,
            }),
        ).toEqual({
            day: 19,
            month: 'Nono',
            year: -14,
        });
    });

    it('should print the dates correctly', () => {
        expect(
            manager.printDate({
                day: 1,
                month: 'Tosaigh',
                year: 885,
            }),
        ).toBe('1 Tosaigh, 1/4 885 P');

        expect(
            manager.printDate({
                day: 55,
                month: 'Teas',
                year: 907,
            }),
        ).toBe('55 Teas, 2/4 907 P');

        expect(
            manager.printDate({
                day: 32,
                month: 'Griamhar',
                year: 501,
            }),
        ).toBe('32 Griamhar, 3/4 501 P');

        expect(
            manager.printDate({
                day: 92,
                month: 'Deireadh',
                year: 1200,
            }),
        ).toBe('92 Deireadh, 4/4 1200 P');
    });
});
