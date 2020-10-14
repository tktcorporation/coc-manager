import { Time } from "@src/domain/core/Time";

export class WarTime {
    public readonly start: Time;
    public readonly end: Time;
    public readonly preparationStart: Time;
    constructor(args: {
        startTime: Time;
        endTime: Time;
        preparationStartTime: Time;
    }) {
        this.start = args.startTime;
        this.end = args.endTime;
        this.preparationStart = args.preparationStartTime;
    }

    /**
     * hh時mm分
     */
    startTimeStr = (timeZone: number) =>
        `${
            this.start.getUTCHours() + timeZone
        }時${this.start.getUTCMinutes()}分`;
    /**
     * mm月dd日 hh時mm分
     */
    strtDateTimeStr = (timeZone: number) =>
        `${this.start
            .getLocalTime(timeZone)
            .createDateStr()} ${this.startTimeStr(timeZone)}`;

    static parseByCocApiTimeStr = (str: string): Time => {
        const matched = cocApiDateArray(str);
        if (matched === null) throw new Error("time format is invalid");
        return Time.parseDateByRegExpMatchArray(matched);
    };
}

const cocApiDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).000Z/;
const cocApiDateArray = (str: string) => str.match(cocApiDateRegex);
