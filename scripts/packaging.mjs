#!/usr/bin/env zx

await $`rimraf ./addon-stencil-doc`;

// Copy TS files and delete src
await $`mkdir addon-stencil-doc`;

// Clean up
await $`cp -r dist/ ./addon-stencil-doc/`;

await $`cp package.json LICENSE README.MD preset.js ./addon-stencil-doc/`;

await $`json -I -f ./addon-stencil-doc/package.json -e "this.scripts=\"{}\""`;

await $`json -I -f ./addon-stencil-doc/package.json -e "this.devDependencies=\"{}\""`;

console.log(
  chalk.green.bold`
    Publish script complete!`,
  chalk.green`
  The package is ready to be released in the nexus repository.
`
);