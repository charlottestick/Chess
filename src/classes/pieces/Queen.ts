import { Piece } from '../Piece';
import { PlayerColour } from '../../types/PlayerColour';

export class Queen extends Piece {
    constructor(x: number, y: number, colour?: PlayerColour) {
        super(x, y, colour);
        this._type = 'Q';
    }
}
