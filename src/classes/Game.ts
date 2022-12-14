import { Board } from './Board';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { terminal as term } from 'terminal-kit';
import { Coordinate } from '../types/Coordinate';

type MouseEvent = { x: number; y: number; ctr: boolean; alt: boolean; shift: boolean };
type KeyboardEvent = { isCharacter: boolean; codepoint: number; code: number | Buffer };

export class Game {
    board: Board;
    state: 'WHITE_TURN' | 'BLACK_TURN' = 'WHITE_TURN'; // Maybe turn into an enum or string literal type etc, enum would be good for efficiency
    players?: 1 | 2; // Temp until I put in a type or something
    takenPieces?: Array<Piece>; // Push pieces here once taken, so we don't lose reference to them

    constructor(numberOfPlayerSelection: 1 | 2 = 2) {
        // I want an empty board, which will expect to be populated with Pieces
        // read piece config from file or something, create objects with coordinates
        // board.addPiece, read each pieces position and store it at the right index
        this.board = new Board();
        this.players = numberOfPlayerSelection;

        doubleFor((x: number, y: number): void => {
            if (y == 0 || y == 1) {
                let newPiece = new Piece(x, y, 'white');
                this.board.placePiece(newPiece);
            } else if (y == 6 || y == 7) {
                let newPiece = new Piece(x, y, 'black');
                this.board.placePiece(newPiece);
            }
        });
    }

    public update() {
        // Display board callback
        // Get piece to move
        // Highlight valid moves for that piece
        this.board.update();
    }

    public grabInputEvents() {
        term.grabInput({ mouse: 'button' });
        term.on('key', this.onKeyboardEvent);
        term.on('mouse', this.onMouseEvent);
    }

    public onMouseEvent(event: string, data: MouseEvent): void {
        if (event == 'MOUSE_LEFT_BUTTON_PRESSED') {
            let mouseBoardPosition: Coordinate = { x: data.x - 1, y: data.y - 1 };
            mouseBoardPosition.x = Math.floor(mouseBoardPosition.x / 3);
            mouseBoardPosition.y = 7 - mouseBoardPosition.y;
            // Error checking
            // Is this mapped position actually on the board?
            // Does it match the array indexing?

            // Other thoughts
            // How does this input get passed around to where it needs to be?
            // Store it in an attribute and read it in update?
            // Input only needs to be read during certain game states?
            // Where does it need to be?

            // Pseudocode
            // square = this.board.getSquare(mouseBoardPosition)
            // square.highlighted = true

            // #In Board display function
            // for each square
            // if square.highlighted
            // set light or dark background colour
            term.moveTo(1, 9);
            console.log('Mouse position: ', data.x, ', ', data.y);
            console.log('Board position: ', mouseBoardPosition.x, ', ', mouseBoardPosition.y);
        }
    }

    public onKeyboardEvent(key: string, matches: Array<string>, data: KeyboardEvent): void {
        if (key === 'CTRL_C') {
            process.exit();
        }
    }
}

// trying to figure out what I need for this class, and how the logic will fit into OOP, pseudocoding with comments and unused members
