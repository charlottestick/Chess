import { Board } from './classes/Board';
import { Piece } from './classes/Piece';

let newBoard = new Board();
newBoard.update();

let piece: Piece | undefined = newBoard.getPiece(2, 1);
piece ? piece.move(2, 4) : undefined;
console.log(newBoard.getPiece(2, 1));
console.log(newBoard.getPiece(2, 1)?.position);
newBoard.update();
