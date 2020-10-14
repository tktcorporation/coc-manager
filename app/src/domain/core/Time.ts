export class Time extends Date {
    isIn = (hours: number, targetTime: Time): boolean =>
        targetTime.valueOf() - this.valueOf() > 0 &&
        Time.createMSecByHours(hours) >= this.diffToTarget(targetTime);

    isCloseTo = (hours: number, targetTime: Time): boolean =>
        Time.createMSecByHours(hours) >= this.diffToTarget(targetTime);

    diffHoursToTarget = (targetTime: Time): number =>
        this.diffToTarget(targetTime) / 1000 / 60 / 60;

    diffToTarget = (targetTime: Time): number =>
        Math.abs(targetTime.valueOf() - this.valueOf());

    /**
     * mm月dd日
     */
    createDateStr = (): string =>
        `${this.getUTCMonth() + 1}月${this.getUTCDate()}日`;

    getLocalTime(diff: number): Time {
        return new Time(this.valueOf() + Time.createMSecByHours(diff));
    }

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
