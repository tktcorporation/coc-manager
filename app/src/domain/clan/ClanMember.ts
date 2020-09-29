import { League } from "./League";

export class ClanMember {
    public readonly league: League;
    public readonly tag: string;
    public readonly name: string;
    public readonly role: string;
    public readonly expLevel: number;
    public readonly clanRank: number;
    public readonly previousClanRank: number;
    public readonly donations: number;
    public readonly donationsReceived: number;
    public readonly trophies: number;
    public readonly versusTrophies: number;
    constructor(args: {
        league: League;
        tag: string;
        name: string;
        role: string;
        expLevel: number;
        clanRank: number;
        previousClanRank: number;
        donations: number;
        donationsReceived: number;
        trophies: number;
        versusTrophies: number;
    }) {
        this.league = args.league;
        this.tag = args.tag;
        this.name = args.name;
        this.role = args.role;
        this.expLevel = args.expLevel;
        this.clanRank = args.clanRank;
        this.previousClanRank = args.previousClanRank;
        this.donations = args.donations;
        this.donationsReceived = args.donationsReceived;
        this.trophies = args.trophies;
        this.versusTrophies = args.versusTrophies;
    }
}
