import { Coordinate } from '../types/Coordinate';
import { PlayerColour } from '../types/PlayerColour';

export class Piece<PlayerColours = PlayerColour> {
    private _position: Coordinate;
    private _taken?: boolean;
    private readonly _playerColour?: PlayerColours;
    private _validMoves: Array<Coordinate> = [];

    constructor(coordinate: Coordinate, colour?: PlayerColours) {
        this._position = coordinate;
        this._playerColour = colour || undefined;
    }

    public move(coordinate: Coordinate): void {
        this._position = coordinate;
    }

    get position(): Coordinate {
        return this._position;
    }
    get taken(): boolean {
        return this._taken || false;
    }
    set taken(newState: boolean) {
        this._taken = newState;
    }
    get playerColour(): PlayerColours | undefined {
        return this._playerColour;
    }
    get validMoves(): Array<Coordinate> {
        return this._validMoves;
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
