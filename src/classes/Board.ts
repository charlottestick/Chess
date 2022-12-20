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
            // I almost figured out the conditional for alternating light and dark squares on my own,
            // but couldn't quite get it to work, so I grabbed it from a video I watched a number of years ago that I remembered had it
            // https://youtu.be/U4ogK0MIzqk?t=14
            // This is the only part of the video I used, as I want to solve problems for myself and come up with my own solution
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

    // The getters and setters below can't use the js get func() syntax
    // This is because getters can't have parameters and the functions affect elements
    // inside the squares arrays which can't be access with dot notation without specifying a position
    public getSquare(position: Coordinate): Square {
        return this.squares[position.y][position.x];
    }
    public getPiece(position: Coordinate): Piece | undefined {
        return this.getSquare(position).piece;
    }
    public placePiece(piece: Piece): void {
        // This method doesn't take a position to move to because it takes the pieces internal position as the truth and places it there
        // This reduces the number of parameters needed and the chance of a mistake, as the position it was previously given was just piece.position
        // It also doesn't assume that the piece is moving, as both setting up the board and moving a piece can be treated as placing a piece
        // somewhere on the board regardless of where it previously was
        this.getSquare(piece.position).piece = piece;
    }
    public removePiece(position: Coordinate): void {
        this.getSquare(position).piece = undefined;
    }

    public update(): void {
        doubleFor((x: number, y: number) => {
            let currentPiece: Piece | undefined = this.getPiece({ x, y });
            if (currentPiece) {
                let actualPosition: Coordinate = currentPiece.position;
                if (actualPosition.x != x || actualPosition.y != y) {
                    // If the internal position is out of sync with the external position
                    // then we know the piece has moved,
                    // so we can re-sync it by placing it and removing the reference stored where it previously was
                    // if there was a piece already at the location moved to it's overwritten, so can be treated as taken
                    // In future development, this out of sync process means we could access the taken piece with the new coordinate
                    // before it gets overwritten, and store it to a taken array to display to the users, or we do other stuff with it

                    // How do we test this block?
                    // Side note: check coverage report to see what needs to be tested
                    this.placePiece(currentPiece);
                    this.removePiece({ x, y });
                }
            }
        });
        // Work out the new state of things, then display the new state
        this.display();
    }

    public display(): void {
        // Is there anyway to test terminal-kit integrations?
        // Mocking the module and checking function calls?
        // Had trouble with mock modules before, couldn't get it working
        term.moveTo(1, 1); // Draw from the top left corner, overwriting the previous frame
        // Potential for bugs with window resizing, terminal-kit has events for resizing which could be used for relative positions instead of absolute

        doubleFor(
            (x: number, y: number) => {
                let square: Square = this.getSquare({ x, y });

                // Deciding background colour based on the background and highlighted attributes
                // un-highlighted background colours were chosen for readable contrast with both white and black test
                // highlighted colours had to still be distinguishable as dark and light, and have good contrast with both the foreground text
                // and the surrounding colours
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
                        term.bgBrightBlack(); // Grey colour
                    }
                }

                // each square is three horizontal cells on the terminal, to try and get them more square shaped
                // Otherwise the board is super thin
                // On some terminals, such as the integrated one in webstorm, there is a gap between lines
                // This makes the board look super weird but is out my control as far as I know
                // Hopefully this is just with the webstorm terminal and the default formatting in other terminals has no extra line spacing
                term(' ');
                let currentPiece: Piece | undefined = this.getPiece({ x, y }); // synonymous with square.piece, might be a good refactor
                // If there is a piece at this square, display its character in its colour
                // Otherwise display an empty string
                currentPiece ? term.color(currentPiece.playerColour, currentPiece.type) : term(' ');
                term(' ');

                term.styleReset();
            },
            () => {
                // Each row, move the cursor down 1 to start drawing the next line of the board
                term.nextLine(1);
            },
            true // Terminal-kit treats the top left as the starting point,
            // but I wanted white on the bottom with (0, 0) being bottom left
            // so this option makes the y loop down from 7 instead of up to 7
        );
    }
}
