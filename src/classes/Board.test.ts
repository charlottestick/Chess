import { Board } from './Board';

describe('Board class', () => {
    describe('Given we instantiate the class', () => {
        let newBoard: Board;
        beforeEach(() => {
            newBoard = new Board();
        })

        it('should create an intitial chess board 1D array', () => {
          expect(newBoard).toHaveProperty('cells')
        });
        it('should contain string characters to represent pieces', () => {
          expect(newBoard.cells).toEqual([
              'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
              'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
              ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
              ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
              ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
              ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
              'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
              'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
          ])
        });
    });
});