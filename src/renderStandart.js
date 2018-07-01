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
  const makeString = (name, value, char = ' ') => `${' '.repeat(spaces - 2)}${char} ${name}: ${stringify(value, nextSpaces)}\n`;

  const typeActions = {
    unchanged: node => makeString(node.key, node.value),
    updated: node => [
      makeString(node.key, node.newValue, '+'),
      makeString(node.key, node.oldValue, '-'),
    ].join(''),
    removed: node => makeString(node.key, node.value, '-'),
    added: node => makeString(node.key, node.value, '+'),
    nested: node => `${' '.repeat(spaces)}${node.key}: ${render(node.children, nextSpaces)}\n`,
  };

  const diffStr = ast.map(node => typeActions[node.type](node)).join('');
  return `{\n${diffStr}${' '.repeat(spaces - defaultSpaces)}}`;
};

export default render;
