const util = require('util');
const spawn = require('child_process').spawn;


function run(directory) {
    return new Promise((resolve, reject) => {

        // Absolute location of the nuke application.
        const application = '/Applications/Nuke9.0v9/Nuke9.0v9.app/Contents/MacOS/Nuke9.0v9';
        const nuke = spawn(application, ['-xi', directory]);

        nuke.stdout.on('data', data => {
            console.log('stdout: ' + data);
        });

        nuke.stderr.on('data', data => {
            console.log('stderr: ' + data);
        });

        nuke.on('exit', code => {
            console.log('child process exited with code ' + code);
            resolve(code);
        });
    })
}

module.exports = {run};