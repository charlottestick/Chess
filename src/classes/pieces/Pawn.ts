import { Piece } from '../Piece';
import { PlayerColour } from '../../types/PlayerColour';

export class Pawn extends Piece {
    // With future development these more specific piece classes would have used polymorphism
    // to overwrite the findValidMoves method with their specific logic
    // for enforcing the rules for each piece
    // Sadly, for this MVP, they just set the correct character representation to display on the board
    constructor(x: number, y: number, colour?: PlayerColour) {
        super(x, y, colour);
        this._type = 'P';
    }
}
