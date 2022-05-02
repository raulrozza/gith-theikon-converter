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
});
