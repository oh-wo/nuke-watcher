#!/usr/bin/env node

const watcher = require('./watcher');
const runner = require('./runner');
const path = require('path');
const mkpath = require('mkpath');
const commandLineArgs = require('command-line-args');


const args = process.argv.slice(2);

nukeWatch(args[0]);

//
// console.log(args)
//
// const optionDefinitions = [
//     { name: 'verbose', alias: 'v', type: Boolean },
//     { name: 'src', type: String, multiple: true, defaultOption: true },
//     { name: 'timeout', alias: 't', type: Number }
// ]

function nukeWatch(relativePath) {

    const dir = path.join(__dirname, relativePath);

    // Setup folder structure.
    mkpath.sync(path.join(dir), 0777);
    mkpath.sync(path.join(dir, '..', 'Complete'), 0777);
    mkpath.sync(path.join(dir, '..', 'Failed'), 0777);

    // Watch directory.
    watcher.watch(dir, file => {
        // Call nuke.
        runner.run(file);
    });
}
