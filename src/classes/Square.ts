import { Piece } from './Piece';

export class Square {
    private background?: string;
    private highlighted: boolean = false;
    public piece?: Piece;

    constructor(newPiece?: Piece) {
        this.piece = newPiece;
    }
}