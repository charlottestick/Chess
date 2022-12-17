import { Coordinate } from '../types/Coordinate';
import { PlayerColour } from '../types/PlayerColour';
import { doubleFor } from '../helpers/doubleFor';

type PieceType = 'X' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

export class Piece {
    private _position: Coordinate;
    protected _type: PieceType = 'X';
    private _taken?: boolean; // Necessary?
    private readonly _playerColour: PlayerColour;
    private _validMoves: Array<Coordinate> = [];

    constructor(x: number, y: number, colour?: PlayerColour) {
        this._position = { x, y };
        this._playerColour = colour || 'black';
    }

    public move(x: number, y: number): void {
        this._position = { x, y };
    }

    get position(): Coordinate {
        return this._position;
    }

    get type(): PieceType {
        return this._type;
    }

    get taken(): boolean {
        return this._taken || false;
    }
    set taken(newState: boolean) {
        this._taken = newState;
    }
    get playerColour(): PlayerColour {
        return this._playerColour;
    }
    get validMoves(): Array<Coordinate> {
        return this._validMoves;
    }

    public findValidMoves(): void {
        this._validMoves = [];
        doubleFor(
            (x: number, y: number): void => {
                this._validMoves.push({ x, y });
            },
            (): void => {},
            true
        );
    }
}

// Proof of Concept that subclasses of Piece can be stored in Array<Piece>

// class DebugPiece extends Piece {
//     constructor() {
//         super({ x: 0, y: 0 });
//     }
// }

// let fakeBoard: Array<Piece> = [];
// let newPiece = new Piece({ x: 0, y: 0 });
// fakeBoard.push(newPiece);
// let newDebugPiece = new DebugPiece();
// fakeBoard.push(newDebugPiece);

// Each piece holds its position, which player it's owned by, whether it's taken or not, maths for moving, array of valid moves

// On being added to the board, the board will read the piece's position and place it at that index
// Maybe even in the Game.update(), so you only change the piece's position directly, and then the board handles keeping track of it's position
