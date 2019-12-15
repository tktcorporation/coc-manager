export const sleep = (msec: number) =>
    new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, msec);
    });
