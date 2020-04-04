export const sleep = (sec: number) =>
    new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, sec * 1000);
    });
