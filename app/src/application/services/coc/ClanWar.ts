import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { CocApi } from "@src/infrastructure/http/cocApi";
import { ClanTag } from "@src/domain/ClanTag";

export class ClanWarService {
    constructor(private cocApi: CocApi) {}

    getCurrentByTag = async (clanTag: ClanTag): Promise<CurrentWar> =>
        new CurrentWar(await this.cocApi.getClanWarByTag(clanTag));
}
