import program from 'commander';
import { version, description } from '../package.json';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format', '[type]  Output format');

export default program;
