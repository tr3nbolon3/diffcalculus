import { readFileSync } from 'fs';
import genDiff from '../src';

test('Compares flat files', () => {
  const file1Path = '__tests__/__fixtures__/file1.json';
  const file2Path = '__tests__/__fixtures__/file2.json';
  const expectedFilePath = '__tests__/__fixtures__/expected.txt';
  const expected = readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(file1Path, file2Path)).toBe(expected);
});
