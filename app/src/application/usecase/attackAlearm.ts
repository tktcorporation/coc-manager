import { LineNotifyService } from "../services/coc/lineNotifyService";
import { BandService } from "../services/coc/band/bandService";
import { CocApi } from "@src/infrastructure/http/cocApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { ClanStoreRepository } from "@src/repository/ClanStoreRepository";
import { LineNotify } from "@src/infrastructure/http/lineNotifyApi";

export const attackAlarm = async (clanTag: string) => {
    const cocApi = new CocApi(process.env.COC_API_TOKEN!);
    const currentWar = new CurrentWar(await cocApi.getClanWarByTag(clanTag));
    if (!currentWar.isInWar) return;
    const message = currentWar.alertMessage([1, 3, 6, 12, 24]);
    if (message == "") return;
    await LineNotify.post(message);
};

export const attackAlermToBand = async (clanTag: string) => {
    const cocApi = new CocApi(process.env.COC_API_TOKEN!);
    const currentWar = new CurrentWar(await cocApi.getClanWarByTag(clanTag));
    if (!currentWar.isInWar) return;
    const message = currentWar.alertMessage([1, 3, 6, 12, 24]);
    if (message == "") return;

    const clan = await new ClanStoreRepository().getByTag(clanTag);
    if (!clan.band) return;

    const bandService = new BandService(clan.band);
    if (currentWar.isCloseToStartOfPrepare()) await bandService.deletePost();
    if (currentWar.isCloseToStart())
        await bandService.createPostAndSave(currentWar.createWarPostBody());
    await bandService
        .pushComment(message)
        .catch(() => bandService.refreshPost(currentWar));
};
