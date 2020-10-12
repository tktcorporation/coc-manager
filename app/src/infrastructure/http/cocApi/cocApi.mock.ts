import { ICocApi } from "@src/application/services/coc/clanWar/ClanWarService";
import { ClanTag } from "@src/domain/ClanTag";
import { Clan } from "@src/domain/clan/Clan";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { WarClan } from "@src/domain/currentWar/WarClan";
import { WarProperties } from "@src/domain/currentWar/warProperties/WarProperties";
import {
    WarStateValue,
    WarState,
} from "@src/domain/currentWar/warState/WarState";
import { WarTime } from "@src/domain/currentWar/WarTime";

export class CocApiMock implements ICocApi {
    getClanByTag = async (tag: ClanTag): Promise<Clan> => {
        return new Clan({
            tag: new ClanTag("#CYPLLU2R"),
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
            state: new WarState(WarStateValue.Ended),
            warProperties: new WarProperties(
                5,
                new WarClan(
                    49.8,
                    new ClanTag("#C9JPLRCP"),
                    "Squaaaaaaa123",
                    {
                        small:
                            "https://api-assets.clashofclans.com/badges/70/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                        large:
                            "https://api-assets.clashofclans.com/badges/512/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                        medium:
                            "https://api-assets.clashofclans.com/badges/200/k33R0ZDMxTIKEP2ftoRzmjAPlBHZAOmXsTu54qInTdY.png",
                    },
                    13,
                    3,
                    6,
                    100,
                    [Object as any]
                ),
                new WarTime({
                    startTime: WarTime.parseByCocApiTimeStr(
                        "20200921T131229.000Z"
                    ),
                    endTime: WarTime.parseByCocApiTimeStr(
                        "20200922T131229.000Z"
                    ),
                    preparationStartTime: WarTime.parseByCocApiTimeStr(
                        "20200920T141229.000Z"
                    ),
                })
            ),
            clan: new WarClan(
                100,
                new ClanTag("#CYPLLU2R"),
                "連邦の黒い☆☆☆",
                {
                    small:
                        "https://api-assets.clashofclans.com/badges/70/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                    large:
                        "https://api-assets.clashofclans.com/badges/512/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                    medium:
                        "https://api-assets.clashofclans.com/badges/200/WZ4OimQ3Dj7xc5bBw1m18FhbtRZdzoVEnKYkvohaess.png",
                },
                10,
                10,
                10,
                15,
                [[Object], [Object], [Object], [Object], [Object]] as any
            ),
        });
    };
}
