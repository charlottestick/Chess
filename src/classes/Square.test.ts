import { Square } from './Square';

describe('Square class', () => {
    describe('Given we instantiate the class', () => {
        let newSquare: Square;
        beforeEach(() => {
            newSquare = new Square('black');
        });
        describe('and we access properties', () => {
            it('should set and get background', () => {
                newSquare.background = 'white';
                expect(newSquare.background).toBe('white');
            });
            it('should set and get highlighted', () => {
                newSquare.highlighted = true;
                expect(newSquare.highlighted).toBe(true);
            });
        });
    });
});
