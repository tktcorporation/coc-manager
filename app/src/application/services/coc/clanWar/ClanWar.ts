import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { CocApi } from "@src/infrastructure/http/cocApi/cocApi";
import { ClanTag } from "@src/domain/ClanTag";
import { Clan } from "@src/domain/Clan";

export interface ICocApi {
    getClanByTag: (tag: ClanTag) => Promise<Clan>;
    getClanWarByTag: (tag: ClanTag) => Promise<CurrentWar>;
}

export class ClanWarService {
    constructor(private cocApi: ICocApi) {}

    getCurrentByTag = async (clanTag: ClanTag): Promise<CurrentWar> =>
        this.cocApi.getClanWarByTag(clanTag);
}
