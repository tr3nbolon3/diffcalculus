import { readFileSync } from 'fs';
import genDiff from '../src';

const makeFilePath = basename => `__tests__/__fixtures__/${basename}`;

describe('Compares flat files', () => {
  const expectedFilePath = makeFilePath('expected.txt');
  const expected = readFileSync(expectedFilePath, 'utf8');

  describe('json', () => {
    const file1Path = makeFilePath('before.json');
    const file2Path = makeFilePath('after.json');

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });

  test('yml', () => {
    const file1Path = makeFilePath('before.yml');
    const file2Path = makeFilePath('after.yml');

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });

  test('ini', () => {
    const file1Path = makeFilePath('before.ini');
    const file2Path = makeFilePath('after.ini');

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });
});

describe('Recursive comparison', () => {
  const expectedFilePath = makeFilePath('expectedNested.txt');
  const expected = readFileSync(expectedFilePath, 'utf8');

  test('json', () => {
    const file1Path = makeFilePath('beforeNested.json');
    const file2Path = makeFilePath('afterNested.json');

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });

  test('yml', () => {
    const file1Path = makeFilePath('beforeNested.yml');
    const file2Path = makeFilePath('afterNested.yml');

    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });

  test('ini', () => {
    const file1Path = makeFilePath('beforeNested.ini');
    const file2Path = makeFilePath('afterNested.ini');
    expect(genDiff(file1Path, file2Path)).toBe(expected);
  });
});

describe('Plain format', () => {
  test('flat files', () => {
    const file1Path = makeFilePath('before.json');
    const file2Path = makeFilePath('after.json');
    const expectedFilePath = makeFilePath('expectedPlain.txt');
    const expected = readFileSync(expectedFilePath, 'utf8');
    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expected);
  });

  test('recursive comparison', () => {
    const file1Path = makeFilePath('beforeNested.json');
    const file2Path = makeFilePath('afterNested.json');
    const expectedFilePath = makeFilePath('expectedNestedPlain.txt');
    const expected = readFileSync(expectedFilePath, 'utf8');
    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expected);
  });
});
