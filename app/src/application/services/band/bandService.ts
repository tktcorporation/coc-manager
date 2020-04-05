import { CurrentWar } from "../../../domain/currentWar/CurrentWar";
import { ClanEntity } from "../../../dao/clan/Clan";
import { BandApi } from "../../../infrastructure/http/bandApi";
import { $log } from "ts-log-debug";
import { sleep } from "../../../infrastructure/sleep";

export class BandService {
    private postKey?: string;
    private bandKey: string;
    private bandApi: BandApi;
    private clanEntity: ClanEntity;

    constructor(clanEntity: ClanEntity) {
        this.clanEntity = clanEntity;
        this.postKey = clanEntity.band!.postKey;
        this.bandKey = clanEntity.band!.bandKey;
        this.bandApi = new BandApi(clanEntity.band!.accessToken);
    }

    attackAlearm = async (war: CurrentWar) => {
        if (war.isCloseToStartOfPrepare()) await this.deletePost();
        if (war.isCloseToStart())
            await this.createPostAndSave(war.createWarPostBody());
        const message = war.alertMessage([1, 3, 6, 12, 24]);
        if (message == "") return;
        await this.pushComment(message).catch(() => this.refreshPost(war));
    };

    createPostAndSave = async (postBody: string) => {
        this.clanEntity.band!.postKey = (
            await this.createPost(postBody)
        ).result_data.post_key;
        await this.clanEntity.save();
    };

    refreshPost = async (war: CurrentWar) => {
        await this.deletePost().catch(() =>
            $log.error("The post was not deleted.")
        );
        await sleep(15);
        await this.createPostAndSave(war.createWarPostBody());
    };

    pushComment = (message: string) =>
        this.bandApi.pushComment(this.bandKey, this.postKey, message);

    private createPost = (postBody: string) =>
        this.bandApi.createPost(this.bandKey, postBody);

    private deletePost = async () => {
        $log.debug(this.postKey);
        if (!this.postKey) return;
        return this.bandApi.deletePost(this.bandKey, this.postKey);
    };
}
