// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { getReplacedScmlImageContent } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('getReplacedScmlImageContent', () => {
    it('should handle image replacement scaling when there was no original scaling', async () => {
        const inputFile = path.join(__dirname, '100x50_unscaled.scml');
        const expectedOutputFile = path.join(__dirname, '200x100_scaled_to_100x50.scml');
        const expectedOutput = fs.readFileSync(expectedOutputFile, 'utf8');

        const output = await getReplacedScmlImageContent(inputFile, '100x50.png', '200x100.png', console.info);

        expect(output).toEqual(expectedOutput);
    });

    it('should handle image replacement scaling when there was original scaling', async () => {
        const inputFile = path.join(__dirname, '100x50_scaled_to_150x30.scml');
        const expectedOutputFile = path.join(__dirname, '200x100_scaled_to_150x30.scml');
        const expectedOutput = fs.readFileSync(expectedOutputFile, 'utf8');

        const output = await getReplacedScmlImageContent(inputFile, '100x50.png', '200x100.png', console.info);
        
        expect(output).toEqual(expectedOutput);
    });
});