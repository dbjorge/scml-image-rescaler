#!/usr/bin/env node

import * as yargs from 'yargs'
import { replaceScmlImage } from './index';

let argv =  yargs
    .help()
    .version()
    .example('$0 --input-file original.scml --output-file updated.scml --original-image-name original.png --new-image-name new.png', 'basic usage')
    .option('input-file', {
        type: 'string',
        describe: "Input .scml file to rescale"
    }).option('verbose', {
        alias: 'v',
        default: false,
    }).option('output-file', {
        type: 'string',
        describe: "Output .scml file to write (if omitted, writes in-place)",
        default: null
    }).option('original-image-name', {
        type: 'string',
        describe: "original image name, relative to project directory (eg, original.png)",
    }).option('new-image-name', {
        type: 'string',
        describe: "new image name, relative to project directory (eg, new.png)",
    }).argv;

if (argv.verbose) {
    console.info("Verbose mode on.");
}

const logger = argv.verbose ? console.info : () => {};

replaceScmlImage(
    argv["input-file"],
    argv["output-file"],
    argv["original-image-name"],
    argv["new-image-name"],
    logger);
