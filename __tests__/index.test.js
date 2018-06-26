import genDiff from '../src';

test('Compares flat files', () => {
  const file1Path = '__tests__/__fixtures__/file1.json';
  const file2Path = '__tests__/__fixtures__/file2.json';
  const expected = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
    - follow: false
  }`;
  expect(genDiff(file1Path, file2Path)).toBe(expected);
});
