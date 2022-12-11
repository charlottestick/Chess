import { Piece } from './Piece';

export class Square {
    private _background: string;
    private _highlighted: boolean = false;
    public piece?: Piece;

    constructor(backgroundColour: string) {
        this._background = backgroundColour;
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
