import { Squares } from '../types/Squares';
import { terminal as term } from 'terminal-kit';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { Coordinate } from '../types/Coordinate';
import { Square } from './Square';

export class Board {
    private _squares: Squares = [[], [], [], [], [], [], [], []];

    constructor() {
        doubleFor((x: number, y: number) => {
            if ((x + y) % 2 == 0) {
                this.squares[y][x] = new Square('dark');
            } else {
                this.squares[y][x] = new Square('light');
            }
        });
    }

    get squares(): Squares {
        // squares is readonly, so the array elements can be changed but the array itself can't be deleted for example
        return this._squares;
    }
    public getSquare(x: number, y: number): Square {
        return this.squares[y][x];
    }
    public getPiece(x: number, y: number): Piece | undefined {
        return this.getSquare(x, y).piece;
    }
    public placePiece(piece: Piece) {
        this.getSquare(piece.position.x, piece.position.y).piece = piece;
    }
    public removePiece(x: number, y: number): void {
        this.getSquare(x, y).piece = undefined;
    }

    public update(): void {
        doubleFor((x: number, y: number) => {
            let currentPiece: Piece | undefined = this.getPiece(x, y);
            if (currentPiece) {
                let actualPosition: Coordinate = currentPiece.position;
                if (actualPosition.x != x || actualPosition.y != y) {
                    // How do we test this block?
                    // Side note: check coverage report to see what needs to be tested
                    this.placePiece(currentPiece);
                    this.removePiece(x, y);
                }
            }
        });
        this.display();
    }

    public display(): void {
        // Is there anyway to test terminal-kit integrations?
        // Mocking the module and checking function calls?
        // Had trouble with mock modules before, couldn't get it working
        term.moveTo(1, 1);
        doubleFor(
            (x: number, y: number) => {
                let square: Square = this.getSquare(x, y);
                if (square.highlighted) {
                    if (square.background === 'light') {
                        term.bgGreen();
                    } else {
                        term.bgRed();
                    }
                } else {
                    if (square.background === 'light') {
                        term.bgCyan();
                    } else {
                        term.bgBrightBlack();
                    }
                }
                term(' ');
                let currentPiece: Piece | undefined = this.getPiece(x, y);
                currentPiece ? term.color(currentPiece.playerColour, currentPiece.type) : term(' ');
                term(' ');
                term.styleReset();
            },
            () => {
                term.nextLine(1);
            },
            true
        );
    }
}
