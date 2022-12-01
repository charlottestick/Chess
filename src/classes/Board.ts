import { Coordinate } from '../types/Coordinate';
import { arrayCopier } from '../helpers/arrayCopier';
import { Row, Squares, Square } from '../types/Squares';
import { terminal as term } from 'terminal-kit';
import { Piece } from './Piece';

export class Board {
    squares: Squares;

    constructor() {
        this.squares = [[], [], [], [], [], [], [], []];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let newPiece = new Piece({ x: i, y: j });
                this.squares[i][j] = new Square(newPiece);
            }
        }
    }

    public getSquareFromCoordinate(coord: Coordinate): Square {
        return this.squares[coord.x][coord.y];
    }

    public display(): void {
        term.clear();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0) {
                    term.bgWhite();
                } else {
                    term.bgBlack();
                }
                term('  ');
            }
            term.nextLine(1);
        }
    }
}
