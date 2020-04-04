import Axios, { AxiosInstance } from "axios";
import { ClanResponse } from "../../domain/Clan";
import { CurrentWarResponse } from "../../domain/currentWar/CurrentWar";

export class CocApi {
    static createAxiosInstance = (token: string) =>
        Axios.create({
            baseURL: "https://api.clashofclans.com/v1",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

    axiosInstance: AxiosInstance;

    constructor(apiToken: string) {
        this.axiosInstance = CocApi.createAxiosInstance(apiToken);
    }

    getClanByTag = async (tag: string): Promise<ClanResponse> => {
        const clan: ClanResponse = (
            await this.axiosInstance.get(`/clans/%23${tag}`)
        ).data;
        return clan;
    };
    getClanWarByTag = async (tag: string): Promise<CurrentWarResponse> =>
        (await this.axiosInstance.get(`/clans/%23${tag}/currentwar`)).data;
}
