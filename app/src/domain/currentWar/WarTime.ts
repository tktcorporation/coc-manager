import { Time } from "@src/domain/Time";

export class WarTime {
    public readonly start: Time;
    public readonly end: Time;
    public readonly preparationStartTime: Time;
    public timeZone: number;
    constructor(
        startTimeStr: string,
        endTimeStr: string,
        preparationStartTime: string,
        timeZone: number
    ) {
        this.start = WarTime.parseByCocApiTimeStr(startTimeStr);
        this.end = WarTime.parseByCocApiTimeStr(endTimeStr);
        this.preparationStartTime = WarTime.parseByCocApiTimeStr(
            preparationStartTime
        );
        this.timeZone = timeZone;
    }
    /**
     * mm月dd日
     */
    startDateStr = () =>
        `${this.start.getMonth() + 1}月${this.start.getDate()}日`;
    /**
     * hh時mm分
     */
    startTimeStr = () =>
        `${
            this.start.getHours() + this.timeZone
        }時${this.start.getMinutes()}分`;
    /**
     * mm月dd日 hh時mm分
     */
    strtDateTimeStr = () => `${this.startDateStr()} ${this.startTimeStr()}`;

    static parseByCocApiTimeStr = (str: string) => {
        const matched = cocApiDateArray(str);
        if (matched === null) throw new Error("time format is invalid");
        return Time.parseDateByRegExpMatchArray(matched);
    };
}

const cocApiDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).000Z/;
const cocApiDateArray = (str: string) => str.match(cocApiDateRegex);
