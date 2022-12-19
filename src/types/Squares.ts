import { Square } from '../classes/Square';

export type Squares = Array<Array<Square>>; // If code elsewhere tries to assign things that won't match these types, tsc won't let us compile/run it
