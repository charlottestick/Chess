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

// What if we don't need a board data structure?

// Store an array of all the pieces, in no particular order, maybe pawns first for search optimisation
// Each piece holds its position, which player it's owned by, whether it's taken or not, maths for moving, array of valid moves

// Only consideration is how do you check for occupancy?
// Iterate over the whole array and check each piece's position? seems like a bad process, unnecessary search time
// Maybe board only holds a marker for each piece?, then the position in question is indexed and can be queried directly, no linear search

// Then how does the board's representation get updated?

// Maybe the Piece provides callbacks that get stored in the board arrays, getPiece().doSomething()?
// JS objects are stored as references, board[i][j] = newPawn; pieces.push(newPawn)
// This logic probably lives in the game manager?
