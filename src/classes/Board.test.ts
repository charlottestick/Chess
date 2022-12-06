import { Board } from './Board';
import { Coordinate } from '../types/Coordinate';
import { Square } from '../types/Squares';
import { Piece } from './Piece';

function createSquareWithPiece(x: number, y: number): Square {
    return new Square(new Piece(x, y));
}

describe('Board class', () => {
    describe('Given we instantiate the class', () => {
        let newBoard: Board;
        beforeEach(() => {
            newBoard = new Board();
        });

        it('should create an initial chess board 2D 8x8 array', () => {
            expect(newBoard.squares).toEqual([[], [], [], [], [], [], [], []]);
            expect(newBoard.squares[0]).toHaveLength(8);
        });
        it('should store square objects in the rows', () => {
            expect(newBoard.squares[0][0]).toBeInstanceOf(Square);
        });
        it('should store each row as a separate array', () => {
            expect(newBoard.squares[0]).not.toBe(newBoard.squares[7]);
        });

        describe.each([[{ x: 0, y: 0 }, createSquareWithPiece(0, 0)]])(
            'Given we call getSquareFromCoordinate with a cartesian coordinate',
            (coordinate: Coordinate, expected: Square) => {
                let square: Square;
                beforeEach(() => {
                    newBoard = new Board();
                    square = newBoard.getSquare(coordinate.x, coordinate.y);
                });

                it('should return the correct piece at that position', () => {
                    expect(square).toEqual(expected);
                });
            }
        );
    });
});
