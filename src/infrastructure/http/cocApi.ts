import Axios from "axios";
import { ClanResponse } from "../../domain/Clan";
import { CurrentWar, CurrentWarResponse } from "../../domain/CurrentWar";

// tslint:disable-next-line: max-line-length
const token = process.env.COC_API_TOKEN!;

const coc = Axios.create({
    baseURL: "https://api.clashofclans.com/v1",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
});

export class CocApi {
    public static getClan = async (tag: string): Promise<ClanResponse> => {
        const clan: ClanResponse = (await coc.get(`/clans/%23${tag}`)).data;
        return clan;
    };
    public static getClanWar = async (
        tag: string
    ): Promise<CurrentWarResponse> =>
        (await coc.get(`/clans/%23${tag}/currentwar`)).data;
}
