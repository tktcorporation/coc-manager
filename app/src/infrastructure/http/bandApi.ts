import Axios from "axios";
import { BandEntity } from "../../domain/model/clan/Band";

const band2 = Axios.create({
    baseURL: "https://openapi.band.us/v2"
});

const band21 = Axios.create({
    baseURL: "https://openapi.band.us/v2.1"
});

const band22 = Axios.create({
    baseURL: "https://openapi.band.us/v2.2"
});

interface CreatePostResponse {
    result_code: number;
    result_data: {
        band_key: string;
        post_key: string;
    };
}

export class BandApi {
    private accessToken: string;
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
    // APIは10秒間隔をあけないとつかえない
    public pushComment = (
        bandkey: BandEntity["bandKey"],
        postkey: BandEntity["postKey"],
        message: string
    ) =>
        band2.post(`/band/post/comment/create`, null, {
            params: {
                access_token: this.accessToken,
                band_key: bandkey,
                post_key: postkey,
                body: message
            }
        });

    public createPost = async (
        bandkey: BandEntity["bandKey"],
        content: string
    ): Promise<CreatePostResponse> =>
        (
            await band22.post(`/band/post/create`, null, {
                params: {
                    access_token: this.accessToken,
                    band_key: bandkey,
                    content,
                    do_push: false
                }
            })
        ).data;

    public getBands = () =>
        band21.get(`/bands`, {
            params: {
                access_token: this.accessToken
            }
        });

    public getPosts = (bandkey: string) =>
        band2.get(`/band/posts`, {
            params: {
                access_token: this.accessToken,
                band_key: bandkey,
                locale: "jp_JP"
            }
        });

    public deletePost = (bandKey: string, postKey: string) =>
        band2.post(`/band/post/remove`, null, {
            params: {
                access_token: this.accessToken,
                band_key: bandKey,
                post_key: postKey
            }
        });
}
