# scml-image-rescaler

Node.js command line tool for replacing an image referenced by an Spriter SCML file with a resized/rescaled version of the same image, rescaling the SCML references as necessary.

Useful if you made an SCML file based on large source images but then later decided to switch to using smaller, resized-down versions of the images in a finished version of your animation.

## Usage
Prerequisite: [Install Node.js LTS](https://nodejs.org/download/)

```bash
npx scml-image-rescaler --help

npx scml-image-rescaler --verbose --input-file ./animation.scml --original-image-name source-image-4000x3000.png --new-image-name smaller-image-200x150.png
```
