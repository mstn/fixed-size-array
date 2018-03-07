#!/bin/bash

# cleanup lib directory
rm -rf lib || exit 0;
mkdir lib;

# cp *.d.ts files
# avoid inclusion of test files
cp ./src/*.d.ts  ./lib

# build vanilla package.json
node -e "var package = require('./package.json'); \
  delete package.scripts; \
  delete package.options; \
  delete package.devDependencies; \
  package.types = 'index.d.ts'; \
  var fs = require('fs'); \
  fs.writeFileSync('./lib/package.json', JSON.stringify(package, null, 2)); \
  "

# Copy to ./npm
cp README.md lib/
cp LICENSE lib/

# publish to npm
cd lib && npm publish --access public
