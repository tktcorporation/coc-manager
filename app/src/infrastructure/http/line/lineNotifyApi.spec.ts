import { LineNotify } from "./lineNotifyApi";
import { Config } from "@src/app.config";

describe("LineNotifyApi", () => {
    const line = new LineNotify(Config.COC_API_TOKEN);
    it("post", async () => {
        const result = await line.sendMessage("test");
        expect(result.message).toBe("ok");
        expect(result.status).toBe(200);
    });
});
