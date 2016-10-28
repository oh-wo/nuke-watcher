const util = require('util');
const spawn = require('child_process').spawn;


function run(directory) {
    return new Promise((resolve, reject) => {
        const nuke = spawn('nuke', ['-xi', directory]);
        // options

        nuke.stdout.on('data', data => {
            console.log('stdout: ' + data);
        });

        nuke.stderr.on('data', data => {
            console.log('stderr: ' + data);
        });

        nuke.on('exit', code => {
            console.log('child process exited with code ' + code);
            resolve();
        });
    })
}

module.exports = {run};