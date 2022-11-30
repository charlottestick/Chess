import { Board } from './Board';
import { Piece } from './Piece';

class Game {
    board?: Board;
    players?: 1 | 2; // Temp until I put in a type or something
    takenPieces?: Array<Piece>; // Push pieces here once taken, so we don't lose reference to them

    constructor() {
        this.board = new Board(); // I want an empty board, which will expect to be populated with Pieces
        // read piece config from file or something, create objects with coordinates
        // board.addPiece, read each pieces position and store it at the right index
    }

    public update() {
        // Display board callback
        // Get piece to move
        // Highlight valid moves for that piece
    }
}

// trying to figure out what I need for this class, and how the logic will fit into OOP, pseudocoding with comments and unused members
