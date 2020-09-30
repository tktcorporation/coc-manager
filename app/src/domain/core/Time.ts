export class Time extends Date {
    isIn = (hours: number, targetTime: Time): boolean =>
        targetTime.valueOf() - this.valueOf() > 0 &&
        Time.createMSecByHours(hours) >= this.diffToTarget(targetTime);

    isCloseTo = (hours: number, targetTime: Time): boolean =>
        Time.createMSecByHours(hours) >= this.diffToTarget(targetTime);

    diffToTarget = (targetTime: Time): number =>
        Math.abs(targetTime.valueOf() - this.valueOf());

    static parseDateByRegExpMatchArray = (regExpMatchArray: RegExpMatchArray) =>
        new Time(
            parseInt(regExpMatchArray[1], 10),
            parseInt(regExpMatchArray[2], 10) - 1,
            parseInt(regExpMatchArray[3], 10),
            parseInt(regExpMatchArray[4], 10),
            parseInt(regExpMatchArray[5], 10),
            parseInt(regExpMatchArray[6], 10)
        );
    static createMSecByHours = (hours: number) => 1000 * 60 * 60 * hours;
    static createMSecByMinutes = (minutes: number) => 1000 * 60 * minutes;
}
