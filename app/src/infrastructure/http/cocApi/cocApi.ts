import Axios, { AxiosInstance } from "axios";
import { Clan } from "../../../domain/clan/Clan";
import { ClanTag } from "../../../domain/ClanTag";
import { CurrentWar } from "../../../domain/currentWar/CurrentWar";
import { $log } from "ts-log-debug";
import { ICocApi } from "@src/application/services/coc/clanWar/ClanWar";
import { ClanMember } from "@src/domain/clan/ClanMember";
import { League } from "@src/domain/clan/League";
import { WarClan } from "@src/domain/currentWar/WarClan";
import { WarMember } from "@src/domain/currentWar/WarMember";

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

export interface ClanResponse {
    tag: string;
    memberList: ClanMemberResponse[];
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

export interface WarMemberResponse {
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

export interface WarClanResponse {
    destructionPercentage: {};
    tag: string;
    name: string;
    badgeUrls: {};
    clanLevel: number;
    attacks: number;
    stars: number;
    expEarned: number;
    members: WarMemberResponse[];
}

export interface CurrentWarResponse {
    clan: WarClanResponse;
    teamSize?: number;
    opponent?: WarClanResponse;
    startTime?: string;
    state: string;
    endTime?: string;
    preparationStartTime?: string;
}

export class CocApi implements ICocApi {
    static createAxiosInstance = (token: string) =>
        Axios.create({
            baseURL: "https://api.clashofclans.com/v1",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

    private axiosInstance: AxiosInstance;

    constructor(apiToken: string) {
        this.axiosInstance = CocApi.createAxiosInstance(apiToken);
    }

    getClanByTag = async (tag: ClanTag): Promise<Clan> => {
        const response: ClanResponse = (
            await this.axiosInstance.get(`/clans/%23${tag.toString()}`)
        ).data;
        return new Clan({
            ...response,
            tag: new ClanTag(response.tag),
            memberList: response.memberList.map(
                (v) =>
                    new ClanMember({
                        ...v,
                        league: new League(
                            v.league.localizedShortName,
                            v.league.localizedName,
                            v.league.name,
                            v.league.id,
                            v.league.iconUrls
                        ),
                    })
            ),
        });
    };
    getClanWarByTag = async (tag: ClanTag): Promise<CurrentWar> => {
        const result: CurrentWarResponse = (
            await this.axiosInstance.get(
                `/clans/%23${tag.toString()}/currentwar`
            )
        ).data;
        // $log.debug(result);
        return new CurrentWar({
            ...result,
            clan: new WarClan(
                result.clan.destructionPercentage,
                new ClanTag(result.clan.tag),
                result.clan.name,
                result.clan.badgeUrls,
                result.clan.clanLevel,
                result.clan.attacks,
                result.clan.stars,
                result.clan.expEarned,
                result.clan.members.map(
                    (v) =>
                        new WarMember(
                            v.tag,
                            v.name,
                            v.mapPosition,
                            v.townhallLevel,
                            v.opponentAttacks,
                            v.bestOpponentAttack,
                            v.attacks
                        )
                )
            ),
            opponent: !result.opponent
                ? undefined
                : new WarClan(
                      result.opponent.destructionPercentage,
                      new ClanTag(result.opponent.tag),
                      result.opponent.name,
                      result.opponent.badgeUrls,
                      result.opponent.clanLevel,
                      result.opponent.attacks,
                      result.opponent.stars,
                      result.opponent.expEarned,
                      result.opponent.members.map(
                          (v) =>
                              new WarMember(
                                  v.tag,
                                  v.name,
                                  v.mapPosition,
                                  v.townhallLevel,
                                  v.opponentAttacks,
                                  v.bestOpponentAttack,
                                  v.attacks
                              )
                      )
                  ),
        });
    };
}
