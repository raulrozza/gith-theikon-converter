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
});
