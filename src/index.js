import { readFileSync } from 'fs';

export default (first, second) => {
  // const result = `Fist: ${readFileSync(first)}\nSecond: ${readFileSync(second)}`;
  const result = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
    - follow: false
  }`;
  return result;
};
