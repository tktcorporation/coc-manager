import { ICocApi } from "@src/application/services/coc/clanWar/ClanWar";
import { ClanTag } from "@src/domain/ClanTag";
import { Clan } from "@src/domain/Clan";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";

export class CocApiMock implements ICocApi {
    getClanByTag = async (tag: ClanTag): Promise<Clan> => {
        return new Clan({
            tag: "#CYPLLU2R",
            name: "連邦の黒い☆☆☆",
            type: "inviteOnly",
            description:
                "連邦周年イベントとは...連邦内の1年間の主権をかけ白黒つける内部紛争である！諸君の奮闘を期待する(｀･ω･´)ゞそれではガンダムファイトー、LADYGo!!",
            badgeUrls: {
                small:
                    "https://api-assets.clashofclans.com/badges/70/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                large:
                    "https://api-assets.clashofclans.com/badges/512/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                medium:
                    "https://api-assets.clashofclans.com/badges/200/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
            },
            location: [Object] as any,
            clanLevel: 10,
            clanPoints: 16699,
            clanVersusPoints: 19636,
            requiredTrophies: 0,
            warFrequency: "never",
            warWinStreak: 4,
            warWins: 86,
            warTies: 3,
            warLosses: 44,
            isWarLogPublic: true,
            // warLeague: { id: 48000012, name: "Crystal League I" },
            members: 15,
            memberList: [
                {
                    tag: "#92U0U9PUP",
                    name: "ELEMENT NATAKU",
                    role: "leader",
                    expLevel: 159,
                    league: [Object] as any,
                    trophies: 3679,
                    versusTrophies: 2623,
                    clanRank: 1,
                    previousClanRank: 1,
                    donations: 2895,
                    donationsReceived: 1200,
                },
                {
                    tag: "#VPC92JLL",
                    name: "Colon",
                    role: "coLeader",
                    expLevel: 187,
                    league: [Object] as any,
                    trophies: 3466,
                    versusTrophies: 3391,
                    clanRank: 2,
                    previousClanRank: 2,
                    donations: 180,
                    donationsReceived: 904,
                },
            ],
            // labels: [],
        });
    };
    getClanWarByTag = async (tag: ClanTag): Promise<CurrentWar> => {
        return new CurrentWar({
            state: "warEnded",
            teamSize: 5,
            preparationStartTime: "20200920T141229.000Z",
            startTime: "20200921T131229.000Z",
            endTime: "20200922T131229.000Z",
            clan: {
                tag: "#CYPLLU2R",
                name: "連邦の黒い☆☆☆",
                badgeUrls: {
                    small:
                        "https://api-assets.clashofclans.com/badges/70/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                    large:
                        "https://api-assets.clashofclans.com/badges/512/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                    medium:
                        "https://api-assets.clashofclans.com/badges/200/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                },
                clanLevel: 10,
                attacks: 10,
                stars: 15,
                destructionPercentage: 100,
                members: [
                    [Object],
                    [Object],
                    [Object],
                    [Object],
                    [Object],
                ] as any,
                expEarned: 100,
            },
            opponent: {
                tag: "#C9JPLRCP",
                name: "Squaaaaaaa123",
                badgeUrls: {
                    small:
                        "https://api-assets.clashofclans.com/badges/70/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                    large:
                        "https://api-assets.clashofclans.com/badges/512/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                    medium:
                        "https://api-assets.clashofclans.com/badges/200/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                },
                clanLevel: 13,
                attacks: 3,
                stars: 6,
                destructionPercentage: 49.8,
                members: [
                    [Object],
                    [Object],
                    [Object],
                    [Object],
                    [Object],
                ] as any,
                expEarned: 100,
            },
        });
    };
}
