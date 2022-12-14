import { Piece } from './classes/Piece';
import { Game } from './classes/Game';
import { terminal } from 'terminal-kit';

let game = new Game();
game.update();
// // game.registerMouseEvents(); CTR-C isn't implemented yet, don't run
//
// let piece: Piece | undefined = game.board.getPiece(2, 1);

var term = require('terminal-kit').terminal;

term.grabInput({ mouse: 'button' });

term.on('key', function (key: any, matches: any, data: { code: number }) {
    if (key === 'CTRL_C') {
        process.exit();
    }
});

term.on('mouse', function (name: any, data: { x: any; y: any }) {
    if (name == 'MOUSE_LEFT_BUTTON_PRESSED') {
        console.log('mouse position: ', data.x, ', ', data.y);
    }
});
