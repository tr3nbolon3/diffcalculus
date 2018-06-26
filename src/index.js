import { readFileSync } from 'fs';
import { has } from 'lodash';

export default (firstFilePath, secondFilePath) => {
  const obj1 = JSON.parse(readFileSync(firstFilePath));
  const obj2 = JSON.parse(readFileSync(secondFilePath));

  const keys = Object.keys({ ...obj1, ...obj2 });

  const printProperty = (obj, key, char) => `  ${char} ${key}: ${obj[key]}\n`;

  const diffStr = keys.map((key) => {
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return printProperty(obj1, key, ' ');
      }
      const removed = printProperty(obj1, key, '-');
      const added = printProperty(obj2, key, '+');
      return `${added}${removed}`;
    }
    if (has(obj1, key)) {
      return printProperty(obj1, key, '-');
    }
    return printProperty(obj2, key, '+');
  }).join('');

  const result = `{\n${diffStr}}`;
  return result;
};
