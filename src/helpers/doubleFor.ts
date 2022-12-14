type ColumnFunc = (x: number, y: number) => void;
type RowFunc = (y: number) => void;

export function doubleFor(eachColumn: ColumnFunc, eachRow?: RowFunc, invertY: boolean = false): void {
    function forColumns(y: number): void {
        for (let x = 0; x < 8; x++) {
            eachColumn(x, y);
        }
        if (eachRow) {
            eachRow(y);
        }
    }

    if (invertY) {
        for (let y = 7; y >= 0; y--) {
            forColumns(y);
        }
    } else {
        for (let y = 0; y <= 7; y++) {
            forColumns(y);
        }
    }
}
