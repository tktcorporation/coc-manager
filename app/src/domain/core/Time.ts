export class Time extends Date {
    /**
     * Return true if within the hours to targetTime.
     * @param hours The hours close to target time
     * @param currentTime
     */
    isCloseTo = (hours: number, targetTime: Time) =>
        Time.createMSecByHours(hours) <=
            this.valueOf() - targetTime.valueOf() &&
        this.valueOf() - targetTime.valueOf() <=
            Time.createMSecByHours(hours + 1);

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
