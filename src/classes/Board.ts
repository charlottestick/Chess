import { Squares, Square } from '../types/Squares';
import { terminal as term } from 'terminal-kit';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { Coordinate } from '../types/Coordinate';

export class Board {
    squares: Squares;

    constructor() {
        this.squares = [[], [], [], [], [], [], [], []];
        doubleFor((i: number, j: number) => {
            let newPiece: Piece | undefined = undefined;
            if (i == 0 || i == 1 || i == 6 || i == 7) {
                newPiece = new Piece(i, j);
            }
            this.squares[i][j] = new Square(newPiece);
        });
    }

    public getSquare(x: number, y: number): Square {
        return this.squares[y][x];
    }
    public getPiece(x: number, y: number): Piece | undefined {
        return this.getSquare(x, y).piece;
    }

    public update(): void {
        this.display();

        doubleFor((i: number, j: number) => {
            let currentPiece: Piece | undefined = this.getSquare(j, i).piece;
            if (currentPiece) {
                let actualPosition: Coordinate = currentPiece.position;
                if (actualPosition.x != j || actualPosition.y != i) this.getSquare(j, i).piece = undefined;
                this.getSquare(actualPosition.x, actualPosition.y).piece = currentPiece;
            }
        });
    }

    public display(): void {
        term.clear();

        doubleFor(
            (i: number, j: number) => {
                if ((i + j) % 2 == 0) {
                    term.bgWhite();
                    term.black();
                } else {
                    term.bgBlack();
                    term.white();
                }
                term(' ');
                let currentPiece: Piece | undefined = this.getPiece(j, i);
                currentPiece ? term(currentPiece.type) : term(' ');
                term(' ');
            },
            () => {
                term.nextLine(1);
            }
        );
    }
}
