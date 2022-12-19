export type PieceType = 'X' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';
// Typescript has a concept called type literals
// This type could be replaced with string but is more specific so that only
// these strings can be assigned to this type of variable
// Anywhere that tries to assign something else or has a logic branch that could possibly assign something else
// will trow a type error when compiling (or in the IDE if supported) and won't run
