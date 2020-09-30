import { WarClan } from "./WarClan";
import { WarTime } from "./WarTime";
import { Time } from "../core/Time";

const WAR_HOURS = 24;
const PREPARE_HOURS = 23;
const TIME_DIFFERENCE_TO_UTC = 9;

export class WarProperties {
    public readonly teamSize: number;
    public readonly opponent: WarClan;
    public readonly time: WarTime;

    constructor(
        teamSize: number,
        opponent: WarClan,
        startTime: string,
        endTime: string,
        preparationStartTime: string
    ) {
        this.teamSize = teamSize;
        this.opponent = opponent;
        this.time = new WarTime(
            startTime,
            endTime,
            preparationStartTime,
            TIME_DIFFERENCE_TO_UTC
        );
    }

    isCloseToStart = (time: Time) =>
        this.time?.start.isCloseTo(WAR_HOURS + 1, time);

    isCloseToStartOfPrepare = (time: Time) =>
        this.time?.start.isCloseTo(WAR_HOURS + PREPARE_HOURS - 1, time);

    alertMessage = (hourOfCloseTo: number) => {
        return WarProperties.createAlertMessage(hourOfCloseTo);
    };

    hourCloseTo = (alerthours: number[], now: Time): number | false => {
        const indexClosedTo = alerthours.find((hour) =>
            this.time.end.isCloseTo(hour, now)
        );
        if (!indexClosedTo) return false;
        return alerthours[indexClosedTo];
    };

    warInfoText = () =>
        this.time &&
        `\n開戦日時: ${this.time.startDateStr()}` +
            `${
                this.time.start.getHours() + TIME_DIFFERENCE_TO_UTC
            }時${this.time.start.getMinutes()}分` +
            `\n`;

    private static createAlertMessage = (hour: number) =>
        `\n終戦まで残り約${hour}時間`;

    private createAlertMessageMinutes = (minute: number) =>
        `\n終戦まで残り${minute}分を切っています`;
}
