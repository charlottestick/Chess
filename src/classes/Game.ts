import { Board } from './Board';
import { doubleFor } from '../helpers/doubleFor';
import { terminal as term } from 'terminal-kit';
import { Coordinate } from '../types/Coordinate';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';
import { MouseEvent } from '../types/MouseEvent';
import { Square } from './Square';

export class Game {
    // There is no underscore naming convention here as Game has no getters or setters as
    // it is the highest level class and nothing needs to access its attributes from where it's instantiated
    private board: Board;
    private moveState: 'SELECTING_PIECE' | 'MOVING_PIECE' = 'SELECTING_PIECE'; // Maybe turn into an enum or string literal type etc., enum would be good for efficiency
    private selectedPosition: Coordinate = { x: 0, y: 0 };
    private gameEnd: boolean = false;

    constructor() {
        // I want an empty board, which will expect to be populated with Pieces
        this.board = new Board();

        // Workaround for issue with using 'this' in a callback, source:
        // https://www.amitmerchant.com/automatically-bind-class-function-callbacks-react/
        // When methods are called from an object, this refers to the object, so the methods have correct access to the class's members
        // However, when they're called as a callback, this refers to the execution context, so don't have access to members
        // bind() creates a copy of the function but locks this to whatever you give it
        // so here we are binding the 'this' in the methods to the reference to the instantiated object
        // the onEvent methods need to be bound to be called by terminal-kit when an event fires
        // the update methods needs to be bound to be called by node in the setTimeout call queue
        this.onMouseEvent = this.onMouseEvent.bind(this);
        this.onKeyboardEvent = this.onKeyboardEvent.bind(this);
        this.update = this.update.bind(this);

        // This could be extracted to method, which would be helpful for a reset board feature
        this.placePawns();
        this.placeRooks();
        this.placeKnights();
        this.placeBishops();
        this.placeQueens();
        this.placeKings();
    }

    public startGameLoop(): void {
        // Clear the screen so nothing leaks into the game screen from before the program started
        // and hide the cursor so the user doesn't see it jumping around when drawing
        term.clear();
        term.hideCursor(true);
        this.grabInputEvents();
        this.update();
    }

    public update(): void {
        if (!this.gameEnd) {
            this.board.update();
            // Game loop solution, based on terminal-kit's spaceship demo implementation, source:
            // https://github.com/cronvel/terminal-kit/blob/master/demo/spaceship.js
            // This will call update again in 50ms, almost like asynchronous recursion, there's no callstack problem because the outer update call returns and pops
            // Only pixels that have changed will be redrawn so no performance concern, and we have more control over the looping rate (and therefore frame rate)
            setTimeout(this.update, 50);
        }
    }

    public grabInputEvents(): void {
        // grabInput puts the terminal in 'raw mode', during which ctrl-C doesn't kill the process,
        // so we have to manually handle that keybinding for ending the program
        // The mouse: button option enables receiving events for mouse button clicks
        term.grabInput({ mouse: 'button' });
        term.on('key', this.onKeyboardEvent);
        term.on('mouse', this.onMouseEvent);
    }

    public onMouseEvent(event: string, data: MouseEvent): void {
        // Left button pressed is the only event we care about
        if (event == 'MOUSE_LEFT_BUTTON_PRESSED') {
            // terminal-kit's point of origin is the top left corner and is 1 indexed
            // Our point of origin is the bottom left of the board and is 0 indexed and
            // the x-axis goes up in groups of 3
            // We need to map from screen space to game space
            let screenSpacePosition: Coordinate = { x: data.x, y: data.y }; // Clarity on which space is being referred to

            let gameSpacePosition: Coordinate = { x: screenSpacePosition.x - 1, y: screenSpacePosition.y - 1 }; // Get 0 indexed version of screen space position
            gameSpacePosition.x = Math.floor(gameSpacePosition.x / 3); // map 0, 1 and 2 to 0, etc.
            gameSpacePosition.y = 7 - gameSpacePosition.y; // invert the y-axis, taking (1, 8) screen space as the point of origin

            let positionIsOnBoard: boolean = !(
                (
                    gameSpacePosition.x > 7 ||
                    gameSpacePosition.y > 7 ||
                    gameSpacePosition.x < 0 ||
                    gameSpacePosition.y < 0
                )
                // x < 0 and y > 7 shouldn't be possible but just in case
            );

            // Debug logging, below the board

            // term.moveTo(1, 9);
            // term.eraseDisplayBelow();
            // console.log('Event: ', data);
            // console.log('Screen position: ', screenSpacePosition.x, ', ', screenSpacePosition.y);
            // console.log('Game position:   ', gameSpacePosition.x, ', ', gameSpacePosition.y);
            if (!positionIsOnBoard) {
                // console.log('On the board: false');
                return;
            } // early return to ignore events off the board
            // console.log('On the board: true');

            if (this.moveState === 'SELECTING_PIECE' && this.board.getPiece(gameSpacePosition)) {
                // If selecting state and there's a piece at the selected position
                // Set the piece's internal position to the game space position
                // Highlight the selected square for visibility
                // Toggle the state
                this.selectedPosition = gameSpacePosition;
                this.board.getSquare(gameSpacePosition).highlighted = true;
                this.moveState = 'MOVING_PIECE';
            } else if (this.moveState === 'MOVING_PIECE') {
                // If moving state
                // Un-highlight the previous position
                // Move the piece to the new position
                // Toggle the state back
                let square: Square = this.board.getSquare(this.selectedPosition);
                square.highlighted = false;
                square.piece?.move(gameSpacePosition); // question mark is typescript syntax for a possibly undefined object
                // Typescript can't tell, but we will never be in the moving state unless we've selected a position with a piece on it,
                // so it won't be undefined
                this.moveState = 'SELECTING_PIECE';
            }
        }
    }

    public onKeyboardEvent(key: string): void {
        if (key === 'CTRL_C') {
            // Handle the exit keybinding
            // sets gameEnd to true which stops update being called again and lets the program end naturally by reaching the last line
            // clear the screen and make the cursor visible again so the user can continue using the terminal as normal
            this.gameEnd = true;
            term.moveTo(1, 1);
            term.eraseDisplayBelow();
            term.hideCursor(false);
            term.grabInput(false); // Takes us out of raw mode which restores keybindings like ctrl-C
        }
    }

    private placeRooks(): void {
        this.board.placePiece(new Rook(0, 0, 'white'));
        this.board.placePiece(new Rook(7, 0, 'white'));
        this.board.placePiece(new Rook(0, 7, 'black'));
        this.board.placePiece(new Rook(7, 7, 'black'));
    }

    private placePawns(): void {
        doubleFor((x: number, y: number): void => {
            if (y === 1) {
                this.board.placePiece(new Pawn(x, y, 'white'));
            } else if (y === 6) {
                this.board.placePiece(new Pawn(x, y, 'black'));
            }
        });
    }

    private placeKnights(): void {
        this.board.placePiece(new Knight(1, 0, 'white'));
        this.board.placePiece(new Knight(6, 0, 'white'));
        this.board.placePiece(new Knight(1, 7, 'black'));
        this.board.placePiece(new Knight(6, 7, 'black'));
    }

    private placeBishops(): void {
        this.board.placePiece(new Bishop(2, 0, 'white'));
        this.board.placePiece(new Bishop(5, 0, 'white'));
        this.board.placePiece(new Bishop(2, 7, 'black'));
        this.board.placePiece(new Bishop(5, 7, 'black'));
    }

    private placeQueens(): void {
        this.board.placePiece(new Queen(3, 0, 'white'));
        this.board.placePiece(new Queen(3, 7, 'black'));
    }

    private placeKings(): void {
        this.board.placePiece(new King(4, 0, 'white'));
        this.board.placePiece(new King(4, 7, 'black'));
    }
}
