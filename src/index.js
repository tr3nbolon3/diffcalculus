import program from 'commander';
import { version } from '../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format', '[type]  Output format');

export default program;
