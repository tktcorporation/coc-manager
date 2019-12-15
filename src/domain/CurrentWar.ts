import {
    isTheTimeCloseTo,
    createMSecByMinutes
} from "../infrastructure/timeCalculator";

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
    public readonly startTime: string;
    public readonly state: string;
    public readonly endTime: string;
    public readonly preparationStartTime: string;

    constructor(response: CurrentWarResponse) {
        this.clan = response.clan;
        this.teamSize = response.teamSize;
        this.opponent = response.opponent;
        this.startTime = response.startTime;
        this.state = response.state;
        this.endTime = response.endTime;
        this.preparationStartTime = response.preparationStartTime;
    }

    isCloseToStart = () => this.isCloseTo(WAR_HOURS + 1);

    isCloseToStartOfPrepare = () =>
        this.isCloseTo(WAR_HOURS + PREPARE_HOURS - 1);

    alertMessage = (alerthours: number[]) =>
        alerthours
            .map(hours => {
                if (this.isCloseTo(hours)) CurrentWar.createAlertMessage(hours);
            })
            .join("");

    createWarPostBody = () => this.warInfoText + this.warMemberText();

    private warInfoText = () =>
        CurrentWar.warInfoText(new Date(this.startTime));

    private static warInfoText = (startTime: Date) =>
        `\n開戦日時: ${startTime.getMonth() + 1}月${startTime.getDate()}日` +
        `${startTime.getHours() +
            TIME_DIFFERENCE_TO_UTC}時${startTime.getMinutes()}分` +
        `\n`;

    private warMemberText = () => CurrentWar.warMemberText(this.clan.members);

    private static warMemberText = (members: WarMember[]) =>
        `参加メンバー:` + members.map(member => `\n・${member.name}`).join("");

    private isCloseTo = (hours: number) =>
        isTheTimeCloseTo(hours, Date.parse(this.endTime));

    private static createAlertMessage = (hour: number) =>
        `\n終戦まで残り約${hour}時間`;

    private createAlertMessageMinutes = (minute: number) =>
        `\n終戦まで残り${minute}分を切っています`;
}
