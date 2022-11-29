import { Coordinate } from '../types/Coordinate';
import { arrayCopier } from '../helpers/arrayCopier';

const kingRow: Array<string> = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
const pawnRow: Array<string> = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];
const emptyRow: Array<string> = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

export class Board {
    squares: Array<Array<string>>;

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

    public getSquareFromCoordinate(coord: Coordinate): string {
        return this.squares[coord.x][coord.y];
    }
}
