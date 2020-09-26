import Axios from "axios";
import querystrings from "querystring";
import { Config } from "@src/app.config";
import { ILineNotify } from "@src/application/services/coc/lineNotifyService";

interface PostResult {
    status: number;
    statusText: string;
    headers: {
        server: string;
        date: string;
        "content-type": string;
        "transfer-encoding": string;
        connection: string;
        "x-ratelimit-limit": string;
        "x-ratelimit-imagelimit": string;
        "x-ratelimit-remaining": string;
        "x-ratelimit-imageremaining": string;
        "x-ratelimit-reset": string;
    };
    config: {
        url: string;
        method: string;
        data: string;
        headers: {
            Accept: string;
            "Content-Type": string;
            Authorization: string;
            "User-Agent": string;
            "Content-Length": number;
        };
        baseURL: string;
        transformRequest: unknown;
        transformResponse: unknown;
        timeout: number;
        adapter: unknown;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        validateStatus: unknown;
    };
    request: unknown;
    data: { status: number; message: string };
}

export class LineNotify implements ILineNotify {
    constructor(private apiToken: string = Config.LINE_NOTIFY_API_TOKEN) {}

    public sendMessage = async (message: string) => {
        const result = await this._post(message);
        return result.data;
    };

    private _post = (message: string): Promise<PostResult> =>
        this.line.post(
            "notify",
            querystrings.stringify({
                message,
            })
        );

    private line = Axios.create({
        baseURL: "https://notify-api.line.me/api",
        headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
}
