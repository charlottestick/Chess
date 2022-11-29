import { arrayCopier } from './arrayCopier';

describe('Array copier', () => {
    describe('Given an array of strings', () => {
        let originalArray: Array<string> = ['a', 'b', 'c'];
        describe('and we call arrayCopier', () => {
            let newArray = arrayCopier(originalArray);
            it('should return a new array', () => {
                expect(newArray).not.toBe(originalArray);
            });

            it('should return an array with the same values', () => {
                expect(newArray).toEqual(originalArray);
            });
        });
    });
});
