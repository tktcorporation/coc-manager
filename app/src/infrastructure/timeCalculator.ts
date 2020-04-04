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
