import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { CocApi } from "@src/infrastructure/http/cocApi/cocApi";
import { ClanTag } from "@src/domain/ClanTag";
import { Clan } from "@src/domain/clan/Clan";
import { ILineNotify } from "../lineNotifyService";
import { Time } from "@src/domain/core/Time";
import { NotExpectedStatusException } from "@src/domain/exception/notExpectedStatus.exception";
import { ErrorMessages } from "@src/domain/exception/message";
import { NoNotificationException } from "@src/domain/exception/noNotification.exception";

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
        if (!currentWar.state.isInWar)
            throw new NotExpectedStatusException(ErrorMessages.NOT_IN_WAR);
        if (!currentWar.warProperties)
            throw new Error("warProperties is not found");
        const hourClosedTo = currentWar.warProperties.hourCloseTo(
            alertHours,
            time
        );
        if (!hourClosedTo) throw new NoNotificationException();
        return currentWar.warProperties.alertMessage(hourClosedTo);
    };

    inWarToCreateMemberList = async (
        currentWar: CurrentWar,
        alertHour: number,
        time: Time
    ): Promise<string> => {
        if (!currentWar.state.isInWar)
            throw new NotExpectedStatusException(ErrorMessages.NOT_IN_WAR);
        if (!currentWar.warProperties)
            throw new Error("warProperties is not found");
        const hourClosedTo = currentWar.warProperties.hourCloseTo(
            [alertHour],
            time
        );
        if (!hourClosedTo) throw new NoNotificationException();
        return currentWar.createWarPostBody();
    };
}
