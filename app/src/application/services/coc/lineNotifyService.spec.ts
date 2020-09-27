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
import { Time } from "@src/domain/Time";

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
    describe("inWarAndInTimeToNotify", () => {
        it("notify", async () => {
            const war = new CurrentWar({
                clan: new WarClan(
                    1,
                    new ClanTag("tag"),
                    "string",
                    {},
                    1,
                    1,
                    1,
                    1,
                    [{} as any]
                ),
                warProperties: undefined,
                state: "notInWar",
            });
            const result = await service.inWarAndInTimeToNotify(
                war,
                allHours,
                new Time()
            );
            expect(result?.message).toBeUndefined();
        });
        it("notify", async () => {
            const war = new CurrentWar({
                clan: new WarClan(
                    1,
                    new ClanTag("tag"),
                    "string",
                    {},
                    1,
                    1,
                    1,
                    1,
                    [{} as any]
                ),
                warProperties: new WarProperties(
                    10,
                    new WarClan(
                        1,
                        new ClanTag("tag"),
                        "string",
                        {},
                        1,
                        1,
                        1,
                        1,
                        [{} as any]
                    ),
                    "20200921T131229.000Z",
                    "20200921T131229.000Z",
                    "20200921T131229.000Z"
                ),
                state: "inWar",
            });
            const result = await service.inWarAndInTimeToNotify(
                war,
                allHours,
                new Time("20200921T131228.000Z")
            );
            expect(result?.message).toBeDefined();
        });
    });
});
