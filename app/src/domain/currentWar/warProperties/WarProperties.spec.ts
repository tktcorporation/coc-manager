import { WarProperties } from "./WarProperties";
import { WarClan } from "../WarClan";
import { WarTime } from "../WarTime";
import { ClanTag } from "@src/domain/ClanTag";
import { Time } from "@src/domain/core/Time";

describe("WarProperties", () => {
    describe("", () => {
        const properties = new WarProperties(
            10,
            new WarClan(
                {},
                new ClanTag("XXXXX"),
                "coc",
                {},
                10,
                10,
                12,
                10,
                Object as any
            ),
            new WarTime({
                startTime: new Time(2020, 12, 10, 23),
                endTime: new Time(2020, 12, 11, 22),
                preparationStartTime: new Time(2020, 12, 9, 23),
            })
        );
        it("hourCloseTo", () => {
            const target = new Time(2020, 12, 10, 22, 10);
            expect(
                Math.ceil(properties.time.end.diffHoursToTarget(target))
            ).toBe(24);
            expect(properties.hourCloseTo([1, 3, 6, 12, 24], target)).toBe(24);
        });
    });
});
