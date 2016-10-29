#!/usr/bin/env node
console.log("console.log output");

const watcher = require('./watcher');
const runner = require('./runner');
const fs = require('fs');
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

function nukeWatch(dir) {
    const complete = path.join(dir, '..', 'Complete');
    const failed = path.join(dir, '..', 'Failed');

    // Setup folder structure.
    mkpath.sync(dir, 0777);
    mkpath.sync(complete, 0777);
    mkpath.sync(failed, 0777);

    // Watch directory.
    watcher.watch(dir, file => {
        // Call nuke.
        runner.run(file)
            .then(code => {
                console.log('success:', code)
                x(code, file);
            })
            .catch(code => {
                console.log('error:', code);
                x(code, file);
            });
    });


    function x(code, file) {
        console.log('code', code);
        const fileName = path.basename(file);
        const target = code === 0 ? complete : failed;
        const newFile = path.join(target, fileName);
        console.log(`code: '${code}': so shifting '${fileName}' to '${newFile}'.`);
        console.log('old:', file);
        console.log('new:', newFile)
        fs.renameSync(file, newFile);
    }
}
