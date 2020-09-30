import { WarTime } from "./WarTime";

describe("WarTime", () => {
    describe("initialize", () => {
        it("20200921T131229.000Z", () => {
            const time = WarTime.parseByCocApiTimeStr("20200921T131229.000Z");
            expect(time.getDate()).toBe(21);
            const value = time.valueOf();
            const date = new Date(value);
            expect(date.toISOString()).toBe("2020-09-21T13:12:29.000Z");
        });
    });
});
