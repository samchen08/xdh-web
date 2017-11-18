#!/usr/bin/env bash
cd `dirname $0`
cd ..
cd ..
basepath=$(pwd)
node release/index.js -f ${basepath}/release/prod/config.js --path / --dist ${basepath}/dist/prod/
