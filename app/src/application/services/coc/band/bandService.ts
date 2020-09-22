import { CurrentWar } from "../../../../domain/currentWar/CurrentWar";
import { BandApi } from "../../../../infrastructure/http/bandApi";
import { $log } from "ts-log-debug";
import { sleep } from "../../../../infrastructure/sleep";
import { Band } from "@src/domain/Band";
import { BandRepository } from "@src/infrastructure/dao/BandDao";

export class BandService {
    bandApi: BandApi;
    constructor(private band: Band, private repository: BandRepository) {
        this.bandApi = new BandApi(band.accessToken);
    }

    createPostAndSave = async (postBody: string) => {
        this.band.postKey = (
            await this.bandApi.createPost(this.band, postBody)
        ).result_data.post_key;
        await this.repository.update(this.band);
        $log.info("success createPostAndSave");
    };

    refreshPost = async (war: CurrentWar) => {
        await this.deletePost().catch(() =>
            $log.error("The post was not deleted.")
        );
        await sleep(15);
        await this.createPostAndSave(war.createWarPostBody());
        $log.info("success refreshPost");
    };

    pushComment = (message: string) =>
        this.bandApi
            .pushComment(this.band.bandKey, this.band.postKey, message)
            .then(() => $log.info("success pushComment"));

    deletePost = async () => {
        if (!this.band.postKey) return;
        this.bandApi
            .deletePost(this.band.bandKey, this.band.postKey)
            .then(() => $log.info("success deletePost"));
    };
}
