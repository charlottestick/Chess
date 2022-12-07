import { Piece } from './classes/Piece';
import { Game } from './classes/Game';

let game = new Game();
game.update();

let piece: Piece | undefined = game.board.getPiece(2, 1);
piece ? piece.move(2, 4) : undefined;
console.log(game.board.getPiece(2, 1));
console.log(game.board.getPiece(2, 1)?.position);
game.update();
