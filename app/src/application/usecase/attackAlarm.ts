import { LineNotifyService } from "../services/coc/lineNotifyService";
import { BandService } from "../services/coc/band/bandService";
import { CocApi } from "@src/infrastructure/http/cocApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { ClanStoreRepository } from "@src/application/repository/ClanStoreRepository";
import { LineNotify } from "@src/infrastructure/http/lineNotifyApi";
import { ClanTag } from "@src/domain/ClanTag";
import { ClanWarService } from "../services/coc/ClanWar";

export class AttackAlarm {
    constructor(
        private clanStoreRepository: ClanStoreRepository,
        private bandService: BandService,
        private clanWarService: ClanWarService,
        private cocApi: CocApi,
        private lineNotufyService: LineNotifyService
    ) {}
    toLine = async (
        clanTag: ClanTag,
        alertHours: number[] = [1, 3, 6, 12, 24]
    ) => {
        const currentWar = await this.clanWarService.getCurrentByTag(clanTag);
        await this.lineNotufyService.inWarAndInTimeToNotify(
            currentWar,
            alertHours
        );
    };

    toBand = async (clanTag: ClanTag) => {
        const currentWar = await this.clanWarService.getCurrentByTag(clanTag);

        if (currentWar.isCloseToStartOfPrepare())
            await this.bandService.deletePost();
        if (currentWar.isCloseToStart())
            await this.bandService.createPostAndSave(
                currentWar.createWarPostBody()
            );
        await this.bandService.inWarAndInTimeToNotify(currentWar);
    };

    refreshPost = async (clanTag: ClanTag) => {
        const clan = await this.clanStoreRepository.getByTag(clanTag);
        if (!clan.band) return;
        const currentWar = new CurrentWar(
            await this.cocApi.getClanWarByTag(clanTag)
        );
        await this.bandService.refreshPost(currentWar);
    };

    checkStatus = async (clanTag: ClanTag) => {
        const currentWar = new CurrentWar(
            await this.cocApi.getClanWarByTag(clanTag)
        );
        await LineNotify.post(currentWar.state);
    };
}
