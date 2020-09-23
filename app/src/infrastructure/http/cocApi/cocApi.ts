import Axios, { AxiosInstance } from "axios";
import { ClanResponse, Clan } from "../../../domain/Clan";
import { ClanTag } from "../../../domain/ClanTag";
import {
    CurrentWarResponse,
    CurrentWar,
} from "../../../domain/currentWar/CurrentWar";
import { $log } from "ts-log-debug";
import { ICocApi } from "@src/application/services/coc/clanWar/ClanWar";

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
        return new Clan(response);
    };
    getClanWarByTag = async (tag: ClanTag): Promise<CurrentWar> => {
        const result: CurrentWarResponse = (
            await this.axiosInstance.get(
                `/clans/%23${tag.toString()}/currentwar`
            )
        ).data;
        // $log.debug(result);
        return new CurrentWar(result);
    };
}
