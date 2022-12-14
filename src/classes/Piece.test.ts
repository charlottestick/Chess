import { Piece } from './Piece';

describe('Piece class', () => {
    describe('Given we have a new piece', () => {
        let newPiece: Piece = new Piece(0, 0); // Have to initialise here, or it thinks it's not defined yet, don't know why it's not recognising beforeEach
        beforeEach(() => {
            newPiece = new Piece(0, 0); // reinitialise before each test, more independence
        });

        it('should initialise position to a default of 0, 0', () => {
            expect(newPiece.position).toEqual({ x: 0, y: 0 });
        });

        describe('and we call move with a position', () => {
            beforeEach(() => {
                newPiece.move(2, 3);
            });
            it('should be in the specified position', () => {
                expect(newPiece.position).toEqual({ x: 2, y: 3 });
            });
        });

        describe('and we call findValidMoves', () => {
            it('should populate the array with all coordinates on the board', () => {
                newPiece.findValidMoves();
                expect(newPiece.validMoves).toHaveLength(64);
                expect(newPiece.validMoves).toContainEqual({ x: 0, y: 0 });
                expect(newPiece.validMoves).toContainEqual({ x: 7, y: 7 });
                expect(newPiece.validMoves).toContainEqual({ x: 4, y: 6 });
            });
            it('should remove previous valid moves when called again', () => {
                newPiece.findValidMoves();
                newPiece.findValidMoves();
                expect(newPiece.validMoves).toHaveLength(64);
            });
        });

        describe('and we access properties', () => {
            it('should get type', () => {
                expect(newPiece.type).toBe('X');
            });
            it('should get PlayerColour', () => {
                expect(newPiece.playerColour).toBe('black');
            });
            it('should get position', () => {
                expect(newPiece.position).toEqual({ x: 0, y: 0 });
            });
            it('should get validMoves', () => {
                expect(newPiece.validMoves).toEqual([]);
            });
            it('should set and get taken', () => {
                expect(newPiece.taken).toBe(false);
                newPiece.taken = true;
                expect(newPiece.taken).toBe(true);
            });
        });
    });
});
