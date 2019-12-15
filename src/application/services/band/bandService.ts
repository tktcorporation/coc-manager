import { CurrentWar } from "../../../domain/CurrentWar";
import { ClanEntity } from "../../../domain/model/clan/Clan";
import { BandApi } from "../../../infrastructure/http/bandApi";
import { BandEntity } from "../../../domain/model/clan/Band";
import { $log } from "ts-log-debug";

export class BandService {
    private postKey?: string;
    private bandKey: string;
    private bandApi: BandApi;

    constructor(band: BandEntity) {
        this.postKey = band.postKey;
        this.bandKey = band.bandKey;
        this.bandApi = new BandApi(band.accessToken);
    }

    attackAlearm = async (war: CurrentWar, clanEntity: ClanEntity) => {
        if (war.isCloseToStartOfPrepare()) await this.deletePost();
        if (war.isCloseToStart())
            await this.createPostAndSave(war.createWarPostBody(), clanEntity);
        const message = war.alertMessage([1, 3, 6, 12, 24]);
        if (message == "") return;
        await this.pushComment(message);
    };

    createPostAndSave = async (postBody: string, clanEntity: ClanEntity) => {
        clanEntity.band!.postKey = (
            await this.createPost(postBody)
        ).result_data.post_key;
        await clanEntity.save();
    };

    refreshPost = async (war: CurrentWar, clan: ClanEntity) => {
        await this.deletePost();
        const postResponse = await this.createPost(war.createWarPostBody());
        $log.debug(postResponse);
        $log.debug("post created");
        clan.band!.postKey = postResponse.result_data.post_key;
        await clan.save();
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
