/**
 * Return true if currentTime over the targetTime in the hours.
 * @param hours The hours close to target time
 * @param targetTime utc msec
 * @param currentTime utc msec
 */
export const isTheTimeCloseTo = (
    hours: number,
    targetTime: number,
    currentTime: number = Date.now()
) =>
    createMSecByHours(hours) <= targetTime - currentTime &&
    targetTime - currentTime <= createMSecByHours(hours + 1);

export const createMSecByHours = (hours: number) => 1000 * 60 * 60 * hours;

export const createMSecByMinutes = (minutes: number) => 1000 * 60 * minutes;

export const parseDateByCocApiTimeStr = (str: string) =>
    parseDateByRegExpMatchArray(cocApiDateArray(str)!);

const parseDateByRegExpMatchArray = (cocApiDateArray?: RegExpMatchArray) =>
    new Date(
        parseInt(cocApiDateArray![1], 10),
        parseInt(cocApiDateArray![2], 10) - 1,
        parseInt(cocApiDateArray![3], 10),
        parseInt(cocApiDateArray![4], 10),
        parseInt(cocApiDateArray![5], 10)
    );

const cocApiDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).000Z/;
const cocApiDateArray = (str: string) => str.match(cocApiDateRegex);
