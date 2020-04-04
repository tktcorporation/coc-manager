import { CocApi } from "../infrastructure/http/cocApi";
import { ClanMember } from "./ClanMember";
export interface ClanResponse {
    tag: string;
    memberList: ClanMember[];
    warFrequency: string;
    clanLevel: number;
    warWinStreak: number;
    warWins: number;
    warTies: number;
    warLosses: number;
    isWarLogPublic: true;
    clanPoints: number;
    clanVersusPoints: number;
    requiredTrophies: number;
    name: string;
    location: {
        localizedName: string;
        id: number;
        name: string;
        isCountry: true;
        countryCode: string;
    };
    type: string;
    members: number;
    description: string;
    badgeUrls: {};
}

export class Clan {
    public readonly tag: string;
    public readonly memberList: ClanMember[];
    public readonly warFrequency: string;
    public readonly clanLevel: number;
    public readonly warWinStreak: number;
    public readonly warWins: number;
    public readonly warTies: number;
    public readonly warLosses: number;
    public readonly isWarLogPublic: true;
    public readonly clanPoints: number;
    public readonly clanVersusPoints: number;
    public readonly requiredTrophies: number;
    public readonly name: string;
    public readonly location: {
        localizedName: string;
        id: number;
        name: string;
        isCountry: true;
        countryCode: string;
    };
    public readonly type: string;
    public readonly members: number;
    public readonly description: string;
    public readonly badgeUrls: {};

    constructor(result: ClanResponse) {
        this.tag = result.tag;
        this.memberList = result.memberList;
        this.warFrequency = result.warFrequency;
        this.clanLevel = result.clanLevel;
        this.warWinStreak = result.warWinStreak;
        this.warWins = result.warWins;
        this.warTies = result.warTies;
        this.warLosses = result.warLosses;
        this.isWarLogPublic = result.isWarLogPublic;
        this.clanPoints = result.clanPoints;
        this.clanVersusPoints = result.clanVersusPoints;
        this.requiredTrophies = result.requiredTrophies;
        this.name = result.name;
        this.location = result.location;
        this.type = result.type;
        this.members = result.members;
        this.description = result.description;
        this.badgeUrls = result.badgeUrls;
    }
}
