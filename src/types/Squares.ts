import { Square } from '../classes/Square';

export type Row = Array<Square>; // If code elsewhere tries to assign things that won't match these types, tsc won't let us compile/run it

export type Squares = Array<Row>;
