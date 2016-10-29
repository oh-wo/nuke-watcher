const watchr = require('watchr');

const handlers = {
    // 'update': (fullPath, callback) => {
    //     if (callback) {
    //         callback(fullPath);
    //     }
    // },

    'create': (fullPath, callback) => {
        if (callback) {
            callback(fullPath);
        }
    },

    // 'delete': (fullPath, callback) => {
    //     if (callback) {
    //         callback(fullPath);
    //     }
    // }
};

function watch(dir, onCreated) {

    function listener(changeType, fullPath, currentStat, previousStat) {
        console.log(changeType, fullPath, currentStat, previousStat)
        if (handlers[changeType]) {
            handlers[changeType](fullPath, onCreated);
        }
    }

    function next(err) {
        if (err)  return console.log('watch failed on', dir, 'with error', err)
        console.log('watch successful on', dir)
    }


    // Watch the dir with the change listener and completion callback.
    const stalker = watchr.open(dir, listener, next)

    process.on('SIGTERM', function () {
        // TODO See if watcher returns a callback and if we should exit in there.
        stalker.close();
        process.exit(0);
    });
}

module.exports = {watch};