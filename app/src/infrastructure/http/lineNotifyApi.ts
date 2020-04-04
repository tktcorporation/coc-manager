import Axios from "axios";
import querystrings from "querystring";

const API_TOKEN = process.env.LINE_NOTIFY_API_TOKEN!;
const line = Axios.create({
    baseURL: "https://notify-api.line.me/api",
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
export class LineNotify {
    public static post = (message: string) =>
        line.post(
            "notify",
            querystrings.stringify({
                message
            })
        );
}
