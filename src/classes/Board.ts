const kingRow: Array<string> = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
const pawnRow: Array<string> = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];
const emptyRow: Array<string> = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

export class Board {
    cells: Array<string>;

    constructor() {
        this.cells = kingRow
            .concat(pawnRow)
            .concat(emptyRow)
            .concat(emptyRow)
            .concat(emptyRow)
            .concat(emptyRow)
            .concat(pawnRow)
            .concat(kingRow);
    }
}
