// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as fs from 'fs';

export type Logger = (string) => void;

export function rescaleScmlFile(
    inputFile: string,
    outputFile: string | null,
    scaleFactor: number,
    log: Logger): void
{
    if (outputFile == null) {
        outputFile = inputFile;
    }

    log(`Rescaling scml file by ${scaleFactor}: '${inputFile}' -> '${outputFile}'`)

    const content = fs.readFileSync(inputFile, 'utf8');
    const rescaledContent = rescaleScmlContent(content, scaleFactor, log);
    fs.writeFileSync(outputFile, rescaledContent, 'utf8');
}

const objectTagRegex =
    /<object folder="(?<folder>\d+)" file="(?<file>\d+)"[^>]+( scale_x="(?<scalex>[\-\d\.]+)")?( scale_y="(?<scaley>[\-\d\.]+)")?>/.compile();

export function rescaleScmlContent(originalContent: string, scaleFactor: number, log: Logger): string
{
    return originalContent;
}