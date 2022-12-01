import { Piece } from '../classes/Piece';

export class Square {
    private background?: string;
    private highlighted: boolean = false;
    private piece?: Piece;

    constructor(newPiece?: Piece) {
        this.piece = newPiece;
    }
}

export type Row = Array<Square>; // If code elsewhere tries to assign things that won't match these types, tsc won't let us compile/run it

export type Squares = Array<Row>;
