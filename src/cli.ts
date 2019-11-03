#!/usr/bin/env node

import * as yargs from 'yargs'

let argv =  yargs
    .help()
    .version()
    .example('$0 --input-file original.scml --output-file half-scale.scml --scale 0.5', 'Rescales for half-size images')
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
    }).option('scale', {
        type: 'number',
        describe: "The factor by which to rescale (eg, 2.0 or 0.5)",
    }).argv;

if (argv.verbose) {
    console.info("Verbose mode on.");
}

const logger = argv.verbose ? console.info : () => {};

rescaleScmlFile(
    argv["input-file"],
    argv["output-file"],
    argv.scale,
    logger);
