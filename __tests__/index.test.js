import { readFileSync } from 'fs';
import genDiff from '../src';

describe('Compares flat files', () => {
  const expectedFilePath = '__tests__/__fixtures__/expected.txt';
  const expected = readFileSync(expectedFilePath, 'utf8');

  test('json', () => {
    const file1Path = '__tests__/__fixtures__/before.json';
    const file2Path = '__tests__/__fixtures__/after.json';

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });

  test('yml', () => {
    const file1Path = '__tests__/__fixtures__/before.yml';
    const file2Path = '__tests__/__fixtures__/after.yml';

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });
});
