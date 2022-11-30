import { Piece } from './Piece';

describe('Piece class', () => {
    describe('Given we have a new piece', () => {
        let newPiece: Piece = new Piece({ x: 0, y: 0 }); // Have to initialise here or it thinks it's not defined yet, don't know why it's not recognising beforeEach
        beforeEach(() => {
            newPiece = new Piece({ x: 0, y: 0 }); // reinitialise before each test, more independence
        });

        it('should have a position property', () => {
            expect(newPiece).toHaveProperty('_position');
        });
        it('should have a move method', () => {
            expect(newPiece).toHaveProperty('move');
        });
        it('should initialise position to a default of 0, 0', () => {
            expect(newPiece.position).toEqual({ x: 0, y: 0 });
        });

        describe('and we call move with a position', () => {
            beforeEach(() => {
                newPiece.move({ x: 2, y: 3 });
            });
            it('should be in the specified position', () => {
                expect(newPiece.position).toEqual({ x: 2, y: 3 });
            });
        });
    });
});
