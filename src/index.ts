import { Piece } from './classes/Piece';
import { Game } from './classes/Game';
import { Square } from './classes/Square';

let game = new Game();
game.update();

let piece: Piece | undefined = game.board.getPiece(2, 1);
piece ? piece.move(2, 4) : undefined;
game.update();
