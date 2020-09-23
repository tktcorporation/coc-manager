interface ClanMemberResponse {
    league: {
        localizedShortName: string;
        localizedName: string;
        name: string;
        id: number;
        iconUrls: {};
    };
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
}

export class ClanMember {
    public readonly league: {
        localizedShortName: string;
        localizedName: string;
        name: string;
        id: number;
        iconUrls: {};
    };
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
    constructor(response: ClanMemberResponse) {
        this.league = response.league;
        this.tag = response.tag;
        this.name = response.name;
        this.role = response.role;
        this.expLevel = response.expLevel;
        this.clanRank = response.clanRank;
        this.previousClanRank = response.previousClanRank;
        this.donations = response.donations;
        this.donationsReceived = response.donationsReceived;
        this.trophies = response.trophies;
        this.versusTrophies = response.versusTrophies;
    }
}
