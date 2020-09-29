import { Time } from "./Time";

describe("Time", () => {
    describe("initialize", () => {});
    describe("diffToTarget", () => {
        it("", () => {
            const time = new Time(1600693910000);
            expect(time.toISOString()).toBe("2020-09-21T13:11:50.000Z");
            const targetTime = new Time(1600693920000);
            expect(targetTime.toISOString()).toBe("2020-09-21T13:12:00.000Z");
            const diff = time.diffToTarget(targetTime);
            expect(diff).toBe(10000);
        });
    });
    describe("closeTo", () => {
        it("1hour close", () => {
            const time = new Time("2020-09-21T13:11:50.000Z");
            expect(time.valueOf()).toBe(1600693910000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isCloseTo = time.isCloseTo(1, targetTime);
            expect(isCloseTo).toBeTruthy();
        });
        it("1hour close and ahead", () => {
            const time = new Time("2020-09-21T13:30:00.000Z");
            expect(time.valueOf()).toBe(1600695000000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isCloseTo = time.isCloseTo(1, targetTime);
            expect(isCloseTo).toBeTruthy();
        });
        it("1hour not close", () => {
            const time = new Time("2020-09-21T12:11:50.000Z");
            expect(time.valueOf()).toBe(1600690310000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isCloseTo = time.isCloseTo(1, targetTime);
            expect(isCloseTo).toBeFalsy();
        });
    });
    describe("in", () => {
        it("1hour close and behind", () => {
            const time = new Time("2020-09-21T13:11:50.000Z");
            expect(time.valueOf()).toBe(1600693910000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isIn = time.isIn(1, targetTime);
            expect(isIn).toBeTruthy();
        });
        it("1hour close and ahead", () => {
            const time = new Time("2020-09-21T13:30:00.000Z");
            expect(time.valueOf()).toBe(1600695000000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isIn = time.isIn(1, targetTime);
            expect(isIn).toBeFalsy();
        });
        it("1hour not close", () => {
            const time = new Time("2020-09-21T12:11:50.000Z");
            expect(time.valueOf()).toBe(1600690310000);
            const targetTime = new Time("2020-09-21T13:12:00.000Z");
            expect(targetTime.valueOf()).toBe(1600693920000);
            const isIn = time.isIn(1, targetTime);
            expect(isIn).toBeFalsy();
        });
    });
});
