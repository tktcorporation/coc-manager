import { LineNotifyService, ILineNotify } from "./lineNotifyService";

class LineNotifyMock implements ILineNotify {
    public sendMessage = async (message: string) => {
        return { status: 200, message };
    };
}

const allHours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
];

describe("LineNotifyService", () => {
    const service = new LineNotifyService(new LineNotifyMock());
    it("sendMessage", async () => {
        const result = await service.sendMessage("message");
        expect(result.status).toBe(200);
        expect(result.message).toBe("message");
    });
});
