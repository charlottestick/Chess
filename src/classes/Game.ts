import { Board } from './Board';
import { Piece } from './Piece';
import { doubleFor } from '../helpers/doubleFor';
import { terminal as term } from 'terminal-kit';
import { Coordinate } from '../types/Coordinate';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';

type MouseEvent = { x: number; y: number; ctr: boolean; alt: boolean; shift: boolean };
type KeyboardEvent = { isCharacter: boolean; codepoint: number; code: number | Buffer };

export class Game {
    private board: Board;
    private moveState: 'SELECTING_PIECE' | 'MOVING_PIECE' = 'SELECTING_PIECE'; // Maybe turn into an enum or string literal type etc, enum would be good for efficiency
    private selectedPosition: Coordinate = { x: 0, y: 0 };
    private gameEnd: boolean = false;

    constructor() {
        // I want an empty board, which will expect to be populated with Pieces
        this.board = new Board();

        // Workaround for issue with using 'this' in a callback, source:
        // https://www.amitmerchant.com/automatically-bind-class-function-callbacks-react/
        this.onMouseEvent = this.onMouseEvent.bind(this);
        this.onKeyboardEvent = this.onKeyboardEvent.bind(this);
        this.update = this.update.bind(this);

        this.placePawns();
        this.placeRooks();
        this.placeKnights();
        this.placeBishops();
        this.placeQueens();
        this.placeKings();
    }

    public startGameLoop() {
        term.clear();
        term.hideCursor(true);
        this.grabInputEvents();
        this.update();
    }

    public update() {
        if (!this.gameEnd) {
            this.board.update();
            // Game loop solution, based on terminal-kit's spaceship demo implementation, source:
            // https://github.com/cronvel/terminal-kit/blob/master/demo/spaceship.js
            // This will call update again in 50ms, almost like asynchronous recursion, there's no callstack problem because the outer update call returns and pops
            // Only pixels that have changed will be redrawn so no performance concern, and we have more control over the looping rate (and therefore frame rate)
            setTimeout(this.update, 50);
        }
    }

    public grabInputEvents() {
        term.grabInput({ mouse: 'button' });
        term.on('key', this.onKeyboardEvent);
        term.on('mouse', this.onMouseEvent);
    }

    public onMouseEvent(event: string, data: MouseEvent): void {
        if (event == 'MOUSE_LEFT_BUTTON_PRESSED') {
            let mouseBoardPosition: Coordinate = { x: data.x - 1, y: data.y - 1 };
            let positionIsOnBoard: boolean;
            mouseBoardPosition.x = Math.floor(mouseBoardPosition.x / 3);
            mouseBoardPosition.y = 7 - mouseBoardPosition.y;

            positionIsOnBoard = !(
                mouseBoardPosition.x > 7 ||
                mouseBoardPosition.y > 7 ||
                mouseBoardPosition.x < 0 ||
                mouseBoardPosition.y < 0
            );

            // Debug logging

            // term.moveTo(1, 9);
            // term.eraseDisplayBelow();
            // console.log('Event: ', data);
            // console.log('Mouse position: ', data.x, ', ', data.y);
            // console.log('Board position: ', mouseBoardPosition.x, ', ', mouseBoardPosition.y);
            if (!positionIsOnBoard) {
                // console.log('On the board: false');
                return;
            }
            // console.log('On the board: true');

            if (
                this.moveState === 'SELECTING_PIECE' &&
                this.board.getPiece(mouseBoardPosition.x, mouseBoardPosition.y)
            ) {
                this.selectedPosition = mouseBoardPosition;
                this.board.getSquare(mouseBoardPosition.x, mouseBoardPosition.y).highlighted = true;
                this.moveState = 'MOVING_PIECE';
            } else if (this.moveState === 'MOVING_PIECE') {
                let square = this.board.getSquare(this.selectedPosition.x, this.selectedPosition.y);
                square.highlighted = false;
                square.piece?.move(mouseBoardPosition.x, mouseBoardPosition.y);
                this.moveState = 'SELECTING_PIECE';
            }
        }
    }

    public onKeyboardEvent(key: string, matches: Array<string>, data: KeyboardEvent): void {
        if (key === 'CTRL_C') {
            this.gameEnd = true;
            term.moveTo(1, 1);
            term.eraseDisplayBelow();
            term.hideCursor(false);
            term.grabInput(false);
        }
    }

    private placeRooks() {
        this.board.placePiece(new Rook(0, 0, 'white'));
        this.board.placePiece(new Rook(7, 0, 'white'));
        this.board.placePiece(new Rook(0, 7, 'black'));
        this.board.placePiece(new Rook(7, 7, 'black'));
    }

    private placePawns() {
        doubleFor((x: number, y: number): void => {
            if (y === 1) {
                this.board.placePiece(new Pawn(x, y, 'white'));
            } else if (y === 6) {
                this.board.placePiece(new Pawn(x, y, 'black'));
            }
        });
    }

    private placeKnights() {
        this.board.placePiece(new Knight(1, 0, 'white'));
        this.board.placePiece(new Knight(6, 0, 'white'));
        this.board.placePiece(new Knight(1, 7, 'black'));
        this.board.placePiece(new Knight(6, 7, 'black'));
    }

    private placeBishops() {
        this.board.placePiece(new Bishop(2, 0, 'white'));
        this.board.placePiece(new Bishop(5, 0, 'white'));
        this.board.placePiece(new Bishop(2, 7, 'black'));
        this.board.placePiece(new Bishop(5, 7, 'black'));
    }

    private placeQueens() {
        this.board.placePiece(new Queen(3, 0, 'white'));
        this.board.placePiece(new Queen(3, 7, 'black'));
    }

    private placeKings() {
        this.board.placePiece(new King(4, 0, 'white'));
        this.board.placePiece(new King(4, 7, 'black'));
    }
}
