import _ from 'lodash';

const getFormatedProp = prop => (_.isObject(prop) ? 'complex value' : `'${prop}'`);

const render = (ast, parent = '') => {
  const typeActions = {
    unchanged: () => null,
    changed: node => [
      `Property '${parent}${node.key}' was updated. `,
      `From ${getFormatedProp(node.oldValue)} `,
      `to ${getFormatedProp(node.newValue)}`,
    ].join(''),
    removed: node => `Property '${parent}${node.key}' was removed`,
    added: node => [
      `Property '${parent}${node.key}' was added with `,
      `${_.isObject(node.value) ? 'complex value' : `value: '${node.value}'`}`,
    ].join(''),
    nested: node => `${render(node.children, `${parent}${node.key}.`)}`,
  };

  return ast.map(node => typeActions[node.type](node)).filter(n => n).join('\n');
};

export default render;
