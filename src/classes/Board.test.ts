import { Board } from './Board';
import { Coordinate } from '../types/Coordinate';

describe('Board class', () => {
    describe('Given we instantiate the class', () => {
        let newBoard: Board;
        beforeEach(() => {
            newBoard = new Board();
        });

        it('should create an initial chess board array', () => {
            expect(newBoard).toHaveProperty('squares');
        });
        it('should be a 2D array with string characters to represent pieces', () => {
            expect(newBoard.squares).toEqual([
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
            ]);
        });
        it('should store each row as a separate array', () => {
            expect(newBoard.squares[0]).not.toBe(newBoard.squares[7]);
        });

        describe.each([[{ x: 0, y: 0 }, 'R']])(
            'Given we call getSquareFromCoordinate with a cartesian coordinate',
            (coordinate: Coordinate, expected: string) => {
                let square: string;
                beforeEach(() => {
                    newBoard = new Board();
                    square = newBoard.getSquareFromCoordinate(coordinate);
                });

                it('should return the correct piece at that position', () => {
                    expect(square).toBe(expected);
                });
            }
        );
    });
});
