import Axios, { AxiosInstance } from "axios";
import { ClanResponse } from "../../domain/Clan";
import { ClanTag } from "../../domain/ClanTag";
import { CurrentWarResponse } from "../../domain/currentWar/CurrentWar";
import { $log } from "ts-log-debug";

export class CocApi {
    static createAxiosInstance = (token: string) =>
        Axios.create({
            baseURL: "https://api.clashofclans.com/v1",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

    axiosInstance: AxiosInstance;

    constructor(apiToken: string) {
        this.axiosInstance = CocApi.createAxiosInstance(apiToken);
    }

    getClanByTag = async (tag: ClanTag): Promise<ClanResponse> => {
        const clan: ClanResponse = (
            await this.axiosInstance.get(`/clans/%23${tag.toString()}`)
        ).data;
        return clan;
    };
    getClanWarByTag = async (tag: ClanTag): Promise<CurrentWarResponse> => {
        const result = (
            await this.axiosInstance.get(
                `/clans/%23${tag.toString()}/currentwar`
            )
        ).data;
        $log.debug(result);
        return result;
    };
}
