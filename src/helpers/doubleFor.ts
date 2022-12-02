export function doubleFor(eachColumn: Function, eachRow?: Function): void {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            eachColumn(x, y);
        }
        eachRow ? eachRow(y) : undefined;
    }
}
