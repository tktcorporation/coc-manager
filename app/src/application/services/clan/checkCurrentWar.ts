import { CocApi } from "../../../infrastructure/http/cocApi";
import { LineNotify } from "../../../infrastructure/http/lineNotifyApi";
import { $log } from "ts-log-debug";
import { ClanEntity } from "../../../dao/clan/Clan";
import { CurrentWar } from "../../../domain/currentWar/CurrentWar";
import { BandService } from "../band/bandService";

const clanTag = process.env.CLAN_TAG!;
// tslint:disable-next-line: max-line-length
const token = process.env.COC_API_TOKEN!;

export class CurrentWarService {
    cocApi: CocApi;
    constructor(public token: string, public clanTag: string) {
        this.cocApi = new CocApi(token);
    }
    checkStatus = async () => {
        const war = new CurrentWar(
            await this.cocApi.getClanWarByTag(this.clanTag)
        );
        $log.debug(war);
        await LineNotify.post(war.state);
    };

    attackAlarm = async () => {
        const war = new CurrentWar(
            await this.cocApi.getClanWarByTag(this.clanTag)
        );
        $log.debug(war.state);
        if (war.state === "") return;
        // inWar,
        const clan = await this.findOneClanByTag(this.clanTag);
        if (clan?.band) new BandService(clan).attackAlearm(war);

        const message = war.alertMessage([1, 3, 6, 12, 24]);
        if (message == "") return;
        await LineNotify.post(message);
    };

    // TODO: remove
    refreshPost = async () => {
        const war = new CurrentWar(
            await this.cocApi.getClanWarByTag(this.clanTag)
        );
        const clan = await this.findOneClanByTag(this.clanTag);
        if (clan?.band) await new BandService(clan).refreshPost(war);
    };

    private findOneClanByTag = (clanTag: string) =>
        ClanEntity.findOne({ tag: clanTag });
}
