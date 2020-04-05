import { WarTime } from "@src/domain/currentWar/WarTime";

export interface WarMember {
    tag: string;
    name: string;
    mapPosition: number;
    townhallLevel: number;
    opponentAttacks: number;
    bestOpponentAttack: {
        order: number;
        attackerTag: string;
        defenderTag: string;
        stars: number;
        destructionPercentage: number;
    };
    attacks: [
        {
            order: number;
            attackerTag: string;
            defenderTag: string;
            stars: number;
            destructionPercentage: number;
        }
    ];
}

interface WarClan {
    destructionPercentage: {};
    tag: string;
    name: string;
    badgeUrls: {};
    clanLevel: number;
    attacks: number;
    stars: number;
    expEarned: number;
    members: WarMember[];
}

export interface CurrentWarResponse {
    clan: WarClan;
    teamSize: number;
    opponent: WarClan;
    startTime: string;
    state: string;
    endTime: string;
    preparationStartTime: string;
}

const WAR_HOURS = 24;
const PREPARE_HOURS = 23;
const TIME_DIFFERENCE_TO_UTC = 9;

export class CurrentWar {
    public readonly clan: WarClan;
    public readonly teamSize: number;
    public readonly opponent: WarClan;
    public readonly time: WarTime;
    public readonly state: string;
    public readonly preparationStartTime: string;

    constructor(response: CurrentWarResponse) {
        this.clan = response.clan;
        this.teamSize = response.teamSize;
        this.opponent = response.opponent;
        this.time = new WarTime(
            response.startTime,
            response.endTime,
            TIME_DIFFERENCE_TO_UTC
        );
        this.state = response.state;
        this.preparationStartTime = response.preparationStartTime;
    }

    isInWar = this.state !== "";

    isCloseToStart = () => this.time.start.isCloseTo(WAR_HOURS + 1);

    isCloseToStartOfPrepare = () =>
        this.time.start.isCloseTo(WAR_HOURS + PREPARE_HOURS - 1);

    alertMessage = (alerthours: number[]) =>
        alerthours
            .map(hours => {
                if (this.time.end.isCloseTo(hours))
                    CurrentWar.createAlertMessage(hours);
            })
            .join("");

    createWarPostBody = () => this.warInfoText() + this.warMemberText();

    private warInfoText = () =>
        `\n開戦日時: ${this.time.startDateStr()}` +
        `${this.time.start.getHours() +
            TIME_DIFFERENCE_TO_UTC}時${this.time.start.getMinutes()}分` +
        `\n`;

    private warMemberText = () =>
        `参加メンバー:` +
        this.clan.members.map(member => `\n・${member.name}`).join("");

    private static createAlertMessage = (hour: number) =>
        `\n終戦まで残り約${hour}時間`;

    private createAlertMessageMinutes = (minute: number) =>
        `\n終戦まで残り${minute}分を切っています`;
}
