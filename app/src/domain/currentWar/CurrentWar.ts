import { WarTime } from "@src/domain/currentWar/WarTime";
import { Clan } from "../clan/Clan";
import { WarClan } from "./WarClan";

const WAR_HOURS = 24;
const PREPARE_HOURS = 23;
const TIME_DIFFERENCE_TO_UTC = 9;

export class CurrentWar {
    public readonly clan: WarClan;
    public readonly teamSize?: number;
    public readonly opponent?: WarClan;
    public readonly time?: WarTime;
    public readonly state: string;

    constructor(args: {
        clan: WarClan;
        teamSize?: number;
        opponent?: WarClan;
        startTime?: string;
        state: string;
        endTime?: string;
        preparationStartTime?: string;
    }) {
        this.clan = args.clan;
        this.state = args.state;

        this.teamSize = args.teamSize;
        this.opponent = args.opponent;
        if (!args.startTime || !args.endTime || !args.preparationStartTime)
            return;
        this.time = new WarTime(
            args.startTime,
            args.endTime,
            args.preparationStartTime,
            TIME_DIFFERENCE_TO_UTC
        );
    }

    isInWar = this.state !== "notInWar";

    isCloseToStart = () => this.time?.start.isCloseTo(WAR_HOURS + 1);

    isCloseToStartOfPrepare = () =>
        this.time?.start.isCloseTo(WAR_HOURS + PREPARE_HOURS - 1);

    alertMessage = (alerthours: number[]) => {
        const time = this.time;
        if (!time) return null;
        return alerthours
            .map((hours) => {
                if (time.end.isCloseTo(hours))
                    CurrentWar.createAlertMessage(hours);
            })
            .join("");
    };

    createWarPostBody = () => this.warInfoText() + this.warMemberText();

    private warInfoText = () =>
        this.time &&
        `\n開戦日時: ${this.time.startDateStr()}` +
            `${
                this.time.start.getHours() + TIME_DIFFERENCE_TO_UTC
            }時${this.time.start.getMinutes()}分` +
            `\n`;

    private warMemberText = () =>
        `参加メンバー:` +
        this.clan.members.map((member) => `\n・${member.getName()}`).join("");

    private static createAlertMessage = (hour: number) =>
        `\n終戦まで残り約${hour}時間`;

    private createAlertMessageMinutes = (minute: number) =>
        `\n終戦まで残り${minute}分を切っています`;
}
