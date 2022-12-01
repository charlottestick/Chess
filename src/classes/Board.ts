import { Coordinate } from '../types/Coordinate';
import { arrayCopier } from '../helpers/arrayCopier';
import { Row, Squares, Square } from '../types/Squares';
let axel = require('axel')

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

    public display():void {
        axel.bg(255,0,0);
        axel.box(2,2,8,4);
    }
}
