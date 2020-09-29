import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { CocApi } from "@src/infrastructure/http/cocApi/cocApi";
import { ClanTag } from "@src/domain/ClanTag";
import { Clan } from "@src/domain/clan/Clan";
import { ILineNotify } from "../lineNotifyService";
import { Time } from "@src/domain/core/Time";

export interface ICocApi {
    getClanByTag: (tag: ClanTag) => Promise<Clan>;
    getClanWarByTag: (tag: ClanTag) => Promise<CurrentWar>;
}

export class ClanWarService {
    constructor(private cocApi: ICocApi) {}

    getCurrentByTag = async (clanTag: ClanTag) => {
        return await this.cocApi.getClanWarByTag(clanTag);
    };

    inWarAndInTimeToMessage = async (
        currentWar: CurrentWar,
        alertHours: number[],
        time: Time
    ): Promise<string> => {
        if (!currentWar.isInWar) throw new Error("clan is not under the war");
        if (!currentWar.warProperties)
            throw new Error("warProperties is not found");
        const hourClosedTo = currentWar.warProperties.hourCloseTo(
            alertHours,
            time
        );
        if (!hourClosedTo) throw new Error("the time is not close to");
        return currentWar.warProperties.alertMessage(hourClosedTo);
    };
}
