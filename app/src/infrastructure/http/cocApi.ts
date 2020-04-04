import Axios from "axios";
import { ClanResponse } from "../../domain/Clan";
import { CurrentWar, CurrentWarResponse } from "../../domain/CurrentWar";

// tslint:disable-next-line: max-line-length
const token = process.env.COC_API_TOKEN!;

export class CocApi {
    static axiosInstance = Axios.create({
        baseURL: "https://api.clashofclans.com/v1",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    readonly apiToken: string;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
    }

    getClanByTag = async (tag: string): Promise<ClanResponse> => {
        const clan: ClanResponse = (
            await CocApi.axiosInstance.get(`/clans/%23${tag}`)
        ).data;
        return clan;
    };
    getClanWarByTag = async (tag: string): Promise<CurrentWarResponse> =>
        (await CocApi.axiosInstance.get(`/clans/%23${tag}/currentwar`)).data;
}
