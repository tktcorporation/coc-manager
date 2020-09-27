export class Time extends Date {
    /**
     * Return true if within the hours to comparedTime.
     * @param hours The hours close to target time
     * @param currentTime
     */
    isCloseTo = (hours: number, comparedTime: Time) =>
        Time.createMSecByHours(hours) <=
            this.valueOf() - comparedTime.valueOf() &&
        this.valueOf() - comparedTime.valueOf() <=
            Time.createMSecByHours(hours + 1);

    static parseDateByRegExpMatchArray = (cocApiDateArray: RegExpMatchArray) =>
        new Time(
            parseInt(cocApiDateArray[1], 10),
            parseInt(cocApiDateArray[2], 10) - 1,
            parseInt(cocApiDateArray[3], 10),
            parseInt(cocApiDateArray[4], 10),
            parseInt(cocApiDateArray[5], 10)
        );
    static createMSecByHours = (hours: number) => 1000 * 60 * 60 * hours;
    static createMSecByMinutes = (minutes: number) => 1000 * 60 * minutes;
}
