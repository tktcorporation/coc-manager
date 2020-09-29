import { ClanWarService } from "./ClanWarService";
import { Config } from "@src/app.config";
import { ClanTag } from "@src/domain/ClanTag";
import { CocApiMock } from "@src/infrastructure/http/cocApi/cocApi.mock";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { WarClan } from "@src/domain/currentWar/WarClan";
import { Time } from "@src/domain/core/Time";
import { WarTime } from "@src/domain/currentWar/WarTime";
import { WarProperties } from "@src/domain/currentWar/WarProperties";

describe("ClanWar", () => {
    const service = new ClanWarService(new CocApiMock());
    it("getCurrentByTag", async () => {
        const currentWar = await service.getCurrentByTag(
            new ClanTag(Config.CLAN_TAG)
        );
        expect(typeof currentWar.isInWar).toBe("boolean");
    });
    describe("inWarAndInTimeToNotify", () => {
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
        it("ignore", async () => {
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
            const message = await service.inWarAndInTimeToMessage(
                war,
                allHours,
                new Time()
            );
            expect(message).toBeUndefined();
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
            const result = await service.inWarAndInTimeToMessage(
                war,
                allHours,
                WarTime.parseByCocApiTimeStr("20200921T131228.000Z")
            );
            expect(result).toBeDefined();
        });
    });
});
