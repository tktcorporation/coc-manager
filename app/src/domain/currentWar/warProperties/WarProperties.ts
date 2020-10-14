import { WarClan } from "../WarClan";
import { WarTime } from "../WarTime";
import { Time } from "../../core/Time";

const WAR_HOURS = 24;
const PREPARE_HOURS = 23;
const TIME_DIFFERENCE_TO_UTC = 9;

export class WarProperties {
    public readonly teamSize: number;
    public readonly opponent: WarClan;
    public readonly time: WarTime;

    constructor(teamSize: number, opponent: WarClan, time: WarTime) {
        this.teamSize = teamSize;
        this.opponent = opponent;
        this.time = time;
    }

    isCloseToStart = (time: Time) =>
        this.time?.start.isCloseTo(WAR_HOURS + 1, time);

    isCloseToStartOfPrepare = (time: Time) =>
        this.time?.start.isCloseTo(WAR_HOURS + PREPARE_HOURS - 1, time);

    alertMessage = (hourOfCloseTo: number) => {
        return WarProperties.createAlertMessage(hourOfCloseTo);
    };

    hourCloseTo = (alerthours: number[], now: Time): number | false => {
        const diff = Math.ceil(this.time.end.diffHoursToTarget(now));
        for (const h of alerthours) {
            if (h === diff) return h;
        }
        return false;
    };

    warInfoText = () =>
        this.time &&
        `${this.warStartTimeInfoText()}\n${this.warEndTimeInfoText()}`;

    warStartTimeInfoText = (): string =>
        this.time &&
        `開戦日時: ${this.time.start
            .getLocalTime(TIME_DIFFERENCE_TO_UTC)
            .createDateStr()}`;

    warEndTimeInfoText = (): string =>
        this.time &&
        `終戦日時: ${this.time.end
            .getLocalTime(TIME_DIFFERENCE_TO_UTC)
            .createDateStr()}`;

    private static createAlertMessage = (hour: number) =>
        `\n終戦まで残り約${hour}時間`;

    private createAlertMessageMinutes = (minute: number) =>
        `\n終戦まで残り${minute}分を切っています`;
}
