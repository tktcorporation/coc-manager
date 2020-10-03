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
     * mm月dd日
     */
    startDateStr = () =>
        `${this.start.getMonth() + 1}月${this.start.getDate()}日`;
    /**
     * hh時mm分
     */
    startTimeStr = (timeZone: number) =>
        `${this.start.getHours() + timeZone}時${this.start.getMinutes()}分`;
    /**
     * mm月dd日 hh時mm分
     */
    strtDateTimeStr = (timeZone: number) =>
        `${this.startDateStr()} ${this.startTimeStr(timeZone)}`;

    static parseByCocApiTimeStr = (str: string): Time => {
        const matched = cocApiDateArray(str);
        if (matched === null) throw new Error("time format is invalid");
        return Time.parseDateByRegExpMatchArray(matched);
    };
}

const cocApiDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).000Z/;
const cocApiDateArray = (str: string) => str.match(cocApiDateRegex);
