import { Board } from './Board';
import { Coordinate } from '../types/Coordinate';
import { Piece } from './Piece';
import { Square } from './Square';

function createSquareWithPiece(x: number, y: number): Square {
    let square = new Square('black');
    square.piece = new Piece(x, y);
    return square;
}

describe('Board class', () => {
    describe('Given we instantiate the class', () => {
        let newBoard: Board;
        beforeEach(() => {
            newBoard = new Board();
        });

        it('should create an initial chess board 2D 8x8 array', () => {
            expect(newBoard.squares).toHaveLength(8);
            expect(newBoard.squares).toBeInstanceOf(Array);
            expect(newBoard.squares[0]).toHaveLength(8);
            expect(newBoard.squares[0]).toBeInstanceOf(Array);
        });
        it('should store empty square objects in the rows', () => {
            expect(newBoard.getSquare(0, 0)).toBeInstanceOf(Square);
            expect(newBoard.getPiece(0, 0)).toBe(undefined);
        });
        it('should store each row as a separate array', () => {
            expect(newBoard.squares[0]).not.toBe(newBoard.squares[7]);
        });

        describe('and we access properties', () => {
            it('should get squares', () => {
                expect(newBoard.squares).toBeInstanceOf(Array);
            });
            it('should set and get a piece', () => {
                let newPiece: Piece = new Piece(0, 0);
                newBoard.placePiece(newPiece);
                expect(newBoard.getPiece(0, 0)).toBe(newPiece);
            });
            it('should remove a piece', () => {
                let newPiece: Piece = new Piece(0, 0);
                newBoard.placePiece(newPiece);
                newBoard.removePiece(0, 0);
                expect(newBoard.getPiece(0, 0)).toBeUndefined();
            });
        });
    });
});
