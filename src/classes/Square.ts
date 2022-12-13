import { Piece } from './Piece';

export class Square {
    private _background: string;
    private _highlighted: boolean = false; // Necessary?
    private _piece?: Piece;

    constructor(backgroundColour: string) {
        this._background = backgroundColour;
    }

    set piece(piece: Piece | undefined) {
        this._piece = piece;
    }

    get piece(): Piece | undefined {
        return this._piece;
    }

    set background(bg: string) {
        this._background = bg;
    }

    get background(): string {
        return this._background;
    }

    set highlighted(newState: boolean) {
        this._highlighted = newState;
    }

    get highlighted(): boolean {
        return this._highlighted;
    }
}
