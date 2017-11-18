#!/usr/bin/env bash
cd `dirname $0`
cd ..
cd ..
basepath=$(pwd)
node release/index.js -f ${basepath}/release/dev/config.js --path / --dist ${basepath}/dist/dev/
