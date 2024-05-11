const sum = require('./sum');

describe('Tests', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
