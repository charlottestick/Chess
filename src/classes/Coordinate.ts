describe('Coordinate class', () => {
    describe('Given we create a new coordinate', () => {
        let position = new Coordinate();
        it('should have a row and column component', () => {
            expect(position).toHaveProperty('row')
            expect(position).toHaveProperty('column')
        });
    });

    describe('Given we call getIndexesFromCoordinate', () => {
        it('should return the 2D array indexes for the right square', () => {});
    });
});
