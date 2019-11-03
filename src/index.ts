// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as fs from 'fs';
import * as path from 'path'
import * as xml2js from 'xml2js';
import * as imageSize from 'image-size';
import { inspect, promisify } from 'util';

const imageSizeAsync = promisify(imageSize as any);

export type Logger = (message: string) => void;

export async function replaceScmlImage(
    inputFile: string,
    outputFile: string | null,
    originalImageName: string,
    newImageName: string,
    log: Logger): Promise<void>
{
    if (outputFile == null) {
        outputFile = inputFile;
    }

    log(`Replacing and rescaling image '${originalImageName}' -> '${newImageName}' in file '${inputFile}' -> '${outputFile}'`)

    const rescaledContent = await getReplacedScmlImageContent(inputFile, originalImageName, newImageName, log);

    log(`Writing updated file contents to '${outputFile}'...`)
    fs.writeFileSync(outputFile, rescaledContent, 'utf8');
    log('Wrote output file.');
}

export async function getReplacedScmlImageContent(originalScmlFile: string, originalImageName: string, newImageName: string, log: Logger): Promise<string>
{
    log(`Parsing input file ${originalScmlFile}...`);

    const originalContent = fs.readFileSync(originalScmlFile, 'utf8');
    const parsed = await xml2js.parseStringPromise(originalContent);

    log('Parsed input file.');

    const newImageFilePath = path.join(path.dirname(originalScmlFile), newImageName);
    log(`Calculating dimensions of new image ${newImageFilePath}...`);
    const newDimensions = await imageSizeAsync(newImageFilePath);
    log(`Calculated new dimensions as ${inspect(newDimensions)}.`);

    log('Calculating transform info...');

    let folderId: number = -1;
    let fileId: number = -1;
    let scaleFactorX: number = -1;
    let scaleFactorY: number = -1;

    for (const folder of parsed.spriter_data.folder) {
        for (const file of folder.file) {
            const fileName = file['$'].name;
            if (fileName === originalImageName) {
                folderId = folder['$'].id;
                fileId = file['$'].id;
                log(`Found matching file entry under folder id ${folderId}:`);
                log(inspect(file['$']));
                
                scaleFactorX = file['$'].width / newDimensions.width;
                scaleFactorY = file['$'].height / newDimensions.height;

                file['$'].name = newImageName;
                file['$'].width = newDimensions.width;
                file['$'].height = newDimensions.height;
                
                break;
            }
        }
    }

    if (folderId === -1) {
        throw new Error(`Didn't find original image ${originalImageName} in scml file ${originalScmlFile}`);
    }

    log('Calculated transform info:');
    log(`  folderId = ${folderId}`);
    log(`  fileId = ${fileId}`);
    log(`  scaleFactorX = ${scaleFactorX}`);
    log(`  scaleFactorY = ${scaleFactorY}`);

    log('Applying scale transform to applicable /spriter_data/entity/animation/timeline/key/object nodes...');

    for (const entity of parsed.spriter_data.entity || []) {
        for (const animation of entity.animation || []) {
            for (const timeline of animation.timeline || []) {
                for (const key of timeline.key || []) {
                    for (const object of key.object || []) {
                        if (object['$'].folder === folderId && object['$'].file === fileId) {
                            const originalScaleX = object['$'].scale_x || 1;
                            const originalScaleY = object['$'].scale_y || 1;
                            object['$'].scale_x = originalScaleX * scaleFactorX;
                            object['$'].scale_y = originalScaleY * scaleFactorY;

                            log(`  Rescaled ${originalScaleX},${originalScaleY} -> ${object['$'].scale_x},${object['$'].scale_y}`);
                        }
                    }
                }
            }
        }
    }

    log('Applied scale transforms.')

    log('Converting modified SCML content back into SCML file format...')
    const xmlBuilder = new xml2js.Builder({
        xmldec: {
            'version': '1.0',
            'encoding': 'UTF-8'
        },
        renderOpts: {
            pretty: true,
            indent: '    ',
            newline: '\n'
       } 
    });
    const xmlOutput = xmlBuilder.buildObject(parsed);

    log('Converted back to SCML format.');
    return xmlOutput;
}