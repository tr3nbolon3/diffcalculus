import _ from 'lodash';

const defaultSpaces = 4;

const stringify = (value, spaces = defaultSpaces) => {
  if (_.isObject(value)) {
    const body = _.keys(value)
      .map(key => `${' '.repeat(spaces)}${key}: ${stringify(value[key], spaces + defaultSpaces)}\n`)
      .join('');
    return `{\n${body}${' '.repeat(spaces - defaultSpaces)}}`;
  }
  return value;
};

const render = (ast, spaces = defaultSpaces) => {
  const nextSpaces = spaces + defaultSpaces;
  const diffStr = ast.map((node) => {
    if (node.type === 'unchanged') {
      return `${' '.repeat(spaces)}${node.key}: ${stringify(node.value, nextSpaces)}\n`;
    }
    if (node.type === 'changed') {
      const result = [
        `${' '.repeat(spaces - 2)}+ ${node.key}: ${stringify(node.newValue, nextSpaces)}\n`,
        `${' '.repeat(spaces - 2)}- ${node.key}: ${stringify(node.oldValue, nextSpaces)}\n`,
      ].join('');

      return result;
    }
    if (node.type === 'removed') {
      return `${' '.repeat(spaces - 2)}- ${node.key}: ${stringify(node.value, nextSpaces)}\n`;
    }
    if (node.type === 'added') {
      return `${' '.repeat(spaces - 2)}+ ${node.key}: ${stringify(node.value, nextSpaces)}\n`;
    }
    if (node.type === 'nested') {
      return `${' '.repeat(spaces)}${node.key}: ${render(node.children, nextSpaces)}\n`;
    }
    return 'undef type';
  }).join('');

  return `{\n${diffStr}${' '.repeat(spaces - defaultSpaces)}}`;
};

export default render;
