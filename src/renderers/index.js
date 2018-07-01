import renderStandart from './standart';
import renderPlain from './plain';

const formats = {
  standart: renderStandart,
  plain: renderPlain,
  json: ast => JSON.stringify(ast, null, '  '),
};

export default (ast, format) => formats[format](ast);