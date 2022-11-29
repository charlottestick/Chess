export function arrayCopier<T>(array: Array<T>): Array<T> {
    let newArray: Array<T> = [];
    array.map((item: T) => {
        newArray.push(item);
    });
    return newArray;
}
