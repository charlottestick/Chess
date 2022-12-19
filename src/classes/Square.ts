import { Piece } from './Piece';

export class Square {
    private _background: string;
    private _highlighted: boolean = false;
    private _piece?: Piece; // Classes are automatically a type, that's helpful

    constructor(backgroundColour: string) {
        this._background = backgroundColour;
    }

    set piece(piece: Piece | undefined) {
        // For this js syntax for getters and setters, setters can;t have a return type
        // and the input and output types must be the same as each other
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
