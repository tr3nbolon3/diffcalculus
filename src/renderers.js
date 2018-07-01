import renderStandart from './renderStandart';
import renderPlain from './renderPlain';

const formats = {
  standart: renderStandart,
  plain: renderPlain,
  json: ast => JSON.stringify(ast, null, '  '),
};

export default (ast, format) => formats[format](ast);
