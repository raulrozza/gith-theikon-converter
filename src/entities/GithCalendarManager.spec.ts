import { GithCalendarManager } from './GithCalendarManager';

describe('GithCalendarManager', () => {
    const manager = new GithCalendarManager();

    it('should convert the positive dates correctly to theikonean dates', () => {
        expect(
            manager.convert({
                day: 1,
                month: 'Empeço',
                year: 865,
            }),
        ).toEqual({
            day: 1,
            month: 'Tosaigh',
            year: 885,
        });

        expect(
            manager.convert({
                day: 17,
                month: 'Nono',
                year: 868,
            }),
        ).toEqual({
            day: 83,
            month: 'Deirant',
            year: 885,
        });

        expect(
            manager.convert({
                day: 25,
                month: 'Quinto',
                year: 901,
            }),
        ).toEqual({
            day: 57,
            month: 'Dosaigh',
            year: 894,
        });
    });

    it('should convert dates correctly even from below the theikon calendar reference', () => {
        expect(
            manager.convert({
                day: 31,
                month: 'Mês da Virada',
                year: 0,
            }),
        ).toEqual({
            day: 94,
            month: 'Deireadh',
            year: 668,
        });

        expect(
            manager.convert({
                day: 1,
                month: 'Empeço',
                year: -3,
            }),
        ).toEqual({
            day: 1,
            month: 'Tosaigh',
            year: 668,
        });

        expect(
            manager.convert({
                day: 19,
                month: 'Nono',
                year: -14,
            }),
        ).toEqual({
            day: 83,
            month: 'Donn',
            year: 665,
        });
    });
});
