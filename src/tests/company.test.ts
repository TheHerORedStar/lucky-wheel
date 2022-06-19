afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});
describe('Test', () => {
  it('1+1 =2', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});
