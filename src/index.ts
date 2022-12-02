import { Board } from './classes/Board';
import { Piece } from './classes/Piece';

let newBoard = new Board();
newBoard.update();

let piece: Piece | undefined = newBoard.getPiece(2, 2);
piece ? piece.move(2, 4) : undefined;
newBoard.update();
