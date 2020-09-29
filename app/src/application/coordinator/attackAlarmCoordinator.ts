import { attackAlarm } from "@src/index";
import { ClanWarService } from "../services/coc/clanWar/ClanWarService";
import { LineNotifyService } from "../services/coc/lineNotifyService";
import { ClanTag } from "@src/domain/ClanTag";
import { Time } from "@src/domain/core/Time";

export class AttackAlarmCoordinator {
    constructor(
        private clanWarService: ClanWarService,
        private lineNotifyService: LineNotifyService
    ) {}
    inWarAndInTimeToNotify = async (
        clanTag: ClanTag,
        alertHours: number[],
        time: Time
    ) => {
        const currentWar = await this.clanWarService.getCurrentByTag(clanTag);
        const message = await this.clanWarService.inWarAndInTimeToMessage(
            currentWar,
            alertHours,
            time
        );
        return await this.lineNotifyService.sendMessage(message);
    };

    sendStatus = async (clanTag: ClanTag) => {
        const currentWar = await this.clanWarService.getCurrentByTag(clanTag);
        await this.lineNotifyService.sendMessage(currentWar.state);
    };
}
