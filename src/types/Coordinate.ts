export type Coordinate = {
    x: number;
    y: number;
    // Could make the components type literals of the valid coordinate values
    // But I think this would cause issues when trying to perform maths on coordinate values
    // As maths could produce any value, and the TS compiler probably doesn't check all mathematical outcomes
};
