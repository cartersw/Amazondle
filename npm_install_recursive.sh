#!/bin/bash

# Find all directories containing a package.json file, excluding node_modules directories
find . -name 'package.json' -not -path '*/node_modules/*' -exec dirname {} \; | while read dir; do
    echo "Running npm install in $dir"
    cd "$dir" && npm install
    cd - > /dev/null
done
