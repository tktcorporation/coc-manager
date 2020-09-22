import { LineNotify } from "./lineNotifyApi";

describe("LineNotifyApi", () => {
    const line = new LineNotify();
    it("post", async () => {
        const result = await line.sendMessage("test");
        expect(result.message).toBe("ok");
        expect(result.status).toBe(200);
    });
});
