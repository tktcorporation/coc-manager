import { Time } from "./Time";

describe("Time", () => {
    describe("initialize", () => {});
    describe("closeTo", () => {
        it("1hour close", () => {
            const time = new Time(1600693910000);
            const targetTime = new Time(1600693920000);
            const result = time.isCloseTo(1, targetTime);
            expect(result).toBeTruthy();
        });
        it("1hour not close", () => {
            const time = new Time();
            const targetTime = new Time();
            const result = time.isCloseTo(1, targetTime);
            expect(result).toBeFalsy();
        });
    });
});
