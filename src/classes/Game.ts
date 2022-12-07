import { Board } from './Board';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { terminal as term } from 'terminal-kit';

export class Game {
    board: Board;
    players?: 1 | 2; // Temp until I put in a type or something
    takenPieces?: Array<Piece>; // Push pieces here once taken, so we don't lose reference to them

    constructor() {
        // I want an empty board, which will expect to be populated with Pieces
        // read piece config from file or something, create objects with coordinates
        // board.addPiece, read each pieces position and store it at the right index
        this.board = new Board();
        doubleFor((x: number, y: number): void => {
            if (y == 0 || y == 1 || y == 6 || y == 7) {
                let newPiece = new Piece(x, y);
                this.board.placePiece(x, y, newPiece);
            }
        });
    }

    public update() {
        // Display board callback
        // Get piece to move
        // Highlight valid moves for that piece
        this.board.update();
    }
}

// trying to figure out what I need for this class, and how the logic will fit into OOP, pseudocoding with comments and unused members
