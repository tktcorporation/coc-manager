import { LineNotifyService } from "../services/coc/lineNotifyService";
import { BandService } from "../services/coc/band/bandService";
import { CocApi } from "@src/infrastructure/http/cocApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { ClanStoreRepository } from "@src/application/repository/ClanStoreRepository";
import { LineNotify } from "@src/infrastructure/http/lineNotifyApi";
import { ClanTag } from "@src/domain/ClanTag";

export class AttackAlarm {
    constructor(
        private clanStoreRepository: ClanStoreRepository,
        private bandService: BandService,
        private cocApi: CocApi
    ) {}
    toLine = async (clanTag: ClanTag) => {
        const currentWar = new CurrentWar(
            await this.cocApi.getClanWarByTag(clanTag)
        );

        if (!currentWar.isInWar) return;
        const message = currentWar.alertMessage([1, 3, 6, 12, 24]);
        if (!message) return;
        await LineNotify.post(message);
    };

    toBand = async (clanTag: ClanTag) => {
        const currentWar = new CurrentWar(
            await this.cocApi.getClanWarByTag(clanTag)
        );
        if (!currentWar.isInWar) return;
        const message = currentWar.alertMessage([1, 3, 6, 12, 24]);
        if (!message) return;

        const clan = await this.clanStoreRepository.getByTag(clanTag);
        if (!clan.band) return;

        if (currentWar.isCloseToStartOfPrepare())
            await this.bandService.deletePost();
        if (currentWar.isCloseToStart())
            await this.bandService.createPostAndSave(
                currentWar.createWarPostBody()
            );
        await this.bandService
            .pushComment(message)
            .catch(() => this.bandService.refreshPost(currentWar));
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
