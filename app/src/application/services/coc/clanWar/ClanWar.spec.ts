import { ClanWarService } from "./ClanWarService";
import { Config } from "@src/app.config";
import { ClanTag } from "@src/domain/ClanTag";
import { CocApiMock } from "@src/infrastructure/http/cocApi/cocApi.mock";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { WarClan } from "@src/domain/currentWar/WarClan";
import { Time } from "@src/domain/core/Time";
import { WarTime } from "@src/domain/currentWar/WarTime";
import { WarProperties } from "@src/domain/currentWar/warProperties/WarProperties";
import { ErrorMessages } from "@src/domain/exception/message";
import {
    WarStateValue,
    WarState,
} from "@src/domain/currentWar/warState/WarState";
import { $log } from "ts-log-debug";
import { NoNotificationException } from "@src/domain/exception/noNotification.exception";

describe("ClanWar", () => {
    const service = new ClanWarService(new CocApiMock());
    it("getCurrentByTag", async () => {
        const currentWar = await service.getCurrentByTag(
            new ClanTag(Config.CLAN_TAG)
        );
        expect(typeof currentWar.state.isInWar).toBe("boolean");
    });
    describe("inWarAndInTimeToNotify", () => {
        const allHours = [1, 2, 3, 6, 12, 24];
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
                state: new WarState(WarStateValue.notIn),
            });
            const message = await service
                .inWarAndInTimeToMessage(war, allHours, new Time())
                .catch((e) => e.message as string);
            expect(message).toBe(ErrorMessages.NOT_IN_WAR);
        });
        describe("inWar", () => {
            it("2 hours before", async () => {
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
                        new WarTime({
                            startTime: new Time(2020, 10, 10, 8),
                            endTime: new Time(2020, 10, 11, 7),
                            preparationStartTime: new Time(2020, 10, 9, 8),
                        })
                    ),
                    state: new WarState(WarStateValue.In),
                });
                const result = await service.inWarAndInTimeToMessage(
                    war,
                    allHours,
                    new Time(2020, 10, 11, 5)
                );
                expect(result).toBeDefined();
                expect(result).toBe("\n終戦まで残り約2時間");
            });
            it("3 hours before", async () => {
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
                        new WarTime({
                            startTime: new Time(2020, 10, 10, 8),
                            endTime: new Time(2020, 10, 11, 7),
                            preparationStartTime: new Time(2020, 10, 9, 8),
                        })
                    ),
                    state: new WarState(WarStateValue.In),
                });
                const result = await service.inWarAndInTimeToMessage(
                    war,
                    allHours,
                    new Time(2020, 10, 11, 4)
                );
                expect(result).toBeDefined();
                expect(result).toBe("\n終戦まで残り約3時間");
            });
        });
        it("24 hours before", async () => {
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
                    new WarTime({
                        startTime: new Time(2020, 10, 10, 8),
                        endTime: new Time(2020, 10, 11, 7),
                        preparationStartTime: new Time(2020, 10, 9, 8),
                    })
                ),
                state: new WarState(WarStateValue.In),
            });
            const result = await service.inWarAndInTimeToMessage(
                war,
                allHours,
                new Time(2020, 10, 10, 7)
            );
            expect(result).toBeDefined();
            expect(result).toBe("\n終戦まで残り約24時間");
        });
        it("12 hours before", async () => {
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
                    new WarTime({
                        startTime: new Time(2020, 10, 10, 8),
                        endTime: new Time(2020, 10, 11, 7),
                        preparationStartTime: new Time(2020, 10, 9, 8),
                    })
                ),
                state: new WarState(WarStateValue.In),
            });
            const result = await service.inWarAndInTimeToMessage(
                war,
                allHours,
                new Time(2020, 10, 10, 19)
            );
            expect(result).toBeDefined();
            expect(result).toBe("\n終戦まで残り約12時間");
        });
        it("13 hours before", async () => {
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
                    new WarTime({
                        startTime: new Time(2020, 10, 10, 8),
                        endTime: new Time(2020, 10, 11, 7),
                        preparationStartTime: new Time(2020, 10, 9, 8),
                    })
                ),
                state: new WarState(WarStateValue.In),
            });
            // const result = await () => service.inWarAndInTimeToMessage(
            //     war,
            //     allHours,
            //     new Time(2020, 10, 10, 20)
            // );
            expect(
                service.inWarAndInTimeToMessage(
                    war,
                    allHours,
                    new Time(2020, 10, 10, 20)
                )
            ).rejects.toThrowError(NoNotificationException);
            // expect(result).toBe("");
        });
    });
});
