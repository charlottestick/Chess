import { doubleFor } from './doubleFor';
import mock = jest.mock;

describe('doubleFor function', () => {
    describe('Given we call doubleFor', () => {
        let mockEachColumn = jest.fn((x: number, y: number): void => {});
        let mockEachRow = jest.fn((x: number): void => {});
        describe('with callback for each column', () => {
            beforeEach(() => {
                doubleFor(mockEachColumn);
            });
            it('should call the callback 64 times', () => {
                expect(mockEachColumn).toHaveBeenCalledTimes(64);
            });
            it('should call the callback with increasing x and y arguments', () => {
                expect(mockEachColumn).toHaveBeenCalledWith(0, 0);
                expect(mockEachColumn).toHaveBeenCalledWith(2, 6);
                expect(mockEachColumn).toHaveBeenCalledWith(5, 3);
                expect(mockEachColumn).toHaveBeenLastCalledWith(7, 7);
            });
        });

        describe('with a callback for each row', () => {
            beforeEach(() => {
                doubleFor(mockEachColumn, mockEachRow);
            });
            it('should call the callback 8 times', () => {
                expect(mockEachRow).toHaveBeenCalledTimes(8);
            });
            it('should call the callback with increasing y arguments', () => {
                expect(mockEachRow.mock.calls).toEqual([[0], [1], [2], [3], [4], [5], [6], [7]]);
            });
        });
    });
});
