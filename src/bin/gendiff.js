#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format', '[type]  Output format')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  });

program.parse(process.argv);
