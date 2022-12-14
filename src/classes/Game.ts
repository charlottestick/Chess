import { Board } from './Board';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { terminal as term } from 'terminal-kit';
import { PlayerColour } from '../types/PlayerColour';

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

    public registerMouseEvents() {
        term.grabInput({ mouse: 'button' });

        term.on('mouse', (name: any, data: any) => {
            console.log('mouse event: ', name, data);
        });
    }

    public registerKeyboardEvents() {} // Need to register CTR-C keybind for exiting application

    public grabInputs() {}
}

// trying to figure out what I need for this class, and how the logic will fit into OOP, pseudocoding with comments and unused members
