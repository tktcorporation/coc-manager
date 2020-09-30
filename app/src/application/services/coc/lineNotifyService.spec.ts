import { LineNotifyService, ILineNotify } from "./lineNotifyService";
import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { Config } from "@src/app.config";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { Clan } from "@src/domain/clan/Clan";
import { ClanTag } from "@src/domain/ClanTag";
import { ClanMember } from "@src/domain/clan/ClanMember";
import { WarClan } from "@src/domain/currentWar/WarClan";
import { WarMember } from "@src/domain/currentWar/WarMember";
import { WarProperties } from "@src/domain/currentWar/WarProperties";
import { Time } from "@src/domain/core/Time";
import { WarTime } from "@src/domain/currentWar/WarTime";
import { CocApiMock } from "@src/infrastructure/http/cocApi/cocApi.mock";

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
