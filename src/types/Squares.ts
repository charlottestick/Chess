// Square type can be changed later to a proper class/type
export type Square = ' ' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'; // Better to be explicit that implicit, squares can only contain valid pieces

export type Row = Array<Square>; // If code elsewhere tries to assign things that won't match these types, tsc won't let us compile/run it

export type Squares = Array<Row>;
