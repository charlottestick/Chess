import { Piece } from './classes/Piece';
import { Game } from './classes/Game';

let game = new Game();
game.update();

let piece: Piece | undefined = game.board.getPiece(2, 1);
console.log(piece?.validMoves);
piece?.findValidMoves();
console.log(piece?.validMoves);
