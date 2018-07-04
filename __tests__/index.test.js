import { readFileSync } from 'fs';
import genDiff from '../src';

const makeFilePath = basename => `__tests__/__fixtures__/${basename}`;

describe('Compares flat files', () => {
  const expected = readFileSync(makeFilePath('expected.txt'), 'utf8');

  test('json', () => {
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
  const expected = readFileSync(makeFilePath('expectedNested.txt'), 'utf8');

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
    const expected = readFileSync(makeFilePath('expectedPlain.txt'), 'utf8');

    const file1Path = makeFilePath('before.json');
    const file2Path = makeFilePath('after.json');

    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expected);
  });

  test('recursive comparison', () => {
    const expected = readFileSync(makeFilePath('expectedNestedPlain.txt'), 'utf8');

    const file1Path = makeFilePath('beforeNested.json');
    const file2Path = makeFilePath('afterNested.json');

    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expected);
  });
});
