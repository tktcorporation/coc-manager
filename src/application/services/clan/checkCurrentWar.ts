import { CocApi } from "../../../infrastructure/http/cocApi";
import { LineNotify } from "../../../infrastructure/http/lineNotifyApi";
import { $log } from "ts-log-debug";
import { ClanEntity } from "../../../domain/model/clan/Clan";
import { BandApi } from "../../../infrastructure/http/bandApi";
import { CurrentWar } from "../../../domain/CurrentWar";
import { BandService } from "../band/bandService";

const clanTag = process.env.CLAN_TAG!;

export class CurrentWarService {
    public async checkStatus() {
        const war = await CocApi.getClanWar(clanTag);
        $log.debug(war);
        const currentTime = new Date();
        const startTime = new Date(war.startTime);
        const endTime = new Date(war.endTime);
        const diff = endTime.getTime() - currentTime.getTime();
        const adate = endTime.getTime() - startTime.getTime();

        $log.debug(currentTime);
        $log.debug(currentTime.getTime());
        $log.debug(startTime);
        $log.debug(startTime.getTime());
        $log.debug(endTime);
        $log.debug(endTime.getTime());
        $log.debug(diff);
        $log.debug(adate);
    }

    public async attackAlarm() {
        const war = new CurrentWar(await CocApi.getClanWar(clanTag));
        $log.debug(war.state);
        if (war.state === "") return;
        // inWar,
        const clan = await this.findOneClanByTag(clanTag);
        if (clan?.band) new BandService(clan.band).attackAlearm(war, clan);

        const message = war.alertMessage([1, 3, 6, 12, 24]);
        if (message == "") return;
        await LineNotify.post(message);
    }

    private findOneClanByTag = (clanTag: string) =>
        ClanEntity.findOne({ tag: clanTag });
}
