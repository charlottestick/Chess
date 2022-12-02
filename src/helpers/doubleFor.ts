export function doubleFor(eachColumn: Function, eachRow?: Function): void {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            eachColumn(i, j);
        }
        eachRow ? eachRow(i) : undefined;
    }
}
