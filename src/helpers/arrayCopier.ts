export function arrayCopier<T>(array: Array<T>): Array<T> {
    // I used this function early on in development when I was populating the board with copies of
    // predefined arrays for the king's rows, the pawn rows, and the empty rows
    // I didn't write tests for it like I did for the doubleFor helper as it was not critical and fell out of use quickly
    let newArray: Array<T> = [];
    array.map((item: T) => {
        newArray.push(item);
    });
    return newArray;
}
