import { Coordinate } from '../types/Coordinate';
import { arrayCopier } from '../helpers/arrayCopier';

// Square type can be changed later to a proper class/type
type Square = ' ' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'; // Better to be explicit that implicit, squares can only contain valid pieces
type Row = Array<Square>; // If code elsewhere tries to assign things that won't match these types, tsc won't let us compile/run it
type Squares = Array<Row>;

const kingRow: Row = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
const pawnRow: Row = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];
const emptyRow: Row = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

export class Board {
    squares: Squares;

    constructor() {
        this.squares = [
            arrayCopier(kingRow),
            arrayCopier(pawnRow),
            arrayCopier(emptyRow),
            arrayCopier(emptyRow),
            arrayCopier(emptyRow),
            arrayCopier(emptyRow),
            arrayCopier(pawnRow),
            arrayCopier(kingRow)
        ];
    }

    public getSquareFromCoordinate(coord: Coordinate): Square {
        return this.squares[coord.x][coord.y];
    }
}
