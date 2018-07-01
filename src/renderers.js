import renderStandart from './renderStandart';
import renderPlain from './renderPlain';

const formats = {
  standart: renderStandart,
  plain: renderPlain,
};

export default (ast, format) => formats[format](ast);
