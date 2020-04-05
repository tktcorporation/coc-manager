import { CurrentWar } from "../../../../domain/currentWar/CurrentWar";
import { BandApi } from "../../../../infrastructure/http/bandApi";
import { $log } from "ts-log-debug";
import { sleep } from "../../../../infrastructure/sleep";
import { Band } from "@src/domain/Band";
import { BandRepository } from "@src/repository/BandRepository";

export class BandService {
    bandApi: BandApi;
    constructor(public band: Band) {
        this.bandApi = new BandApi(band.accessToken);
    }

    createPostAndSave = async (postBody: string) => {
        this.band.postKey = (
            await this.createPost(postBody)
        ).result_data.post_key;
        new BandRepository().update(this.band);
    };

    refreshPost = async (war: CurrentWar) => {
        await this.deletePost().catch(() =>
            $log.error("The post was not deleted.")
        );
        await sleep(15);
        await this.createPostAndSave(war.createWarPostBody());
    };

    pushComment = (message: string) =>
        this.bandApi.pushComment(this.band.bandKey, this.band.postKey, message);

    private createPost = (postBody: string) =>
        this.bandApi.createPost(this.band.bandKey, postBody);

    static createPost = (band: Band, postBody: string) =>
        new BandApi(band.accessToken).createPost(band.bandKey, postBody);

    static deletePost = async (band: Band) =>
        new BandApi(band.accessToken).deletePost(band.bandKey, band.postKey!);

    deletePost = async () => {
        if (!this.band.postKey) return;
        return this.bandApi.deletePost(this.band.bandKey, this.band.postKey);
    };
}
