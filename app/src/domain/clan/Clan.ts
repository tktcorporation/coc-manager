import { CocApi } from "../../infrastructure/http/cocApi/cocApi";
import { ClanMember } from "./ClanMember";
import { ClanTag } from "../ClanTag";

export class Clan {
    public readonly tag: ClanTag;
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

    constructor(args: {
        tag: ClanTag;
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
    }) {
        this.tag = args.tag;
        this.memberList = args.memberList;
        this.warFrequency = args.warFrequency;
        this.clanLevel = args.clanLevel;
        this.warWinStreak = args.warWinStreak;
        this.warWins = args.warWins;
        this.warTies = args.warTies;
        this.warLosses = args.warLosses;
        this.isWarLogPublic = args.isWarLogPublic;
        this.clanPoints = args.clanPoints;
        this.clanVersusPoints = args.clanVersusPoints;
        this.requiredTrophies = args.requiredTrophies;
        this.name = args.name;
        this.location = args.location;
        this.type = args.type;
        this.members = args.members;
        this.description = args.description;
        this.badgeUrls = args.badgeUrls;
    }
}
