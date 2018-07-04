import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parser';
import buildAst from './builder';
import render from './renderers';

export default (firstFilePath, secondFilePath, format = 'standart') => {
  const obj1 = parse(extname(firstFilePath), readFileSync(firstFilePath, 'utf8'));
  const obj2 = parse(extname(secondFilePath), readFileSync(secondFilePath, 'utf8'));
  const diff = buildAst(obj1, obj2);
  return render(diff, format);
};
