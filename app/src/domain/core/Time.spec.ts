import { Time } from "./Time";

describe("Time", () => {
    describe("initialize", () => {
        it("new", () => {
            const time = new Time(2020, 11, 12, 9, 10);
            expect(time.getUTCHours()).toBe(9);
            expect(time.getUTCMonth()).toBe(11);
            expect(time.createDateStr()).toBe("12月12日");
        });
    });
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
        describe("1 hour", () => {
            it("1hour close", () => {
                const time = new Time("2020-09-21T13:11:50.000Z");
                expect(time.valueOf()).toBe(1600693910000);
                const targetTime = new Time("2020-09-21T13:12:00.000Z");
                expect(targetTime.valueOf()).toBe(1600693920000);
                expect(Math.ceil(time.diffHoursToTarget(targetTime))).toBe(1);
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
        describe("14 hours", () => {
            it("14 hour close", () => {
                const time = new Time("2020-09-21T13:11:50.000Z");
                const targetTime = new Time("2020-09-22T02:12:00.000Z");
                expect(Math.ceil(time.diffHoursToTarget(targetTime))).toBe(14);
                const isCloseTo = time.isCloseTo(14, targetTime);
                expect(isCloseTo).toBeTruthy();
            });
            it("14 hour close and ahead", () => {
                const time = new Time("2020-09-21T13:30:00.000Z");
                const targetTime = new Time("2020-09-22T02:12:00.000Z");
                const isCloseTo = time.isCloseTo(14, targetTime);
                expect(isCloseTo).toBeTruthy();
            });
            it("14 hour not close", () => {
                const time = new Time("2020-09-21T12:11:50.000Z");
                const targetTime = new Time("2020-09-22T02:12:00.000Z");
                const isCloseTo = time.isCloseTo(14, targetTime);
                expect(isCloseTo).toBeFalsy();
            });
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
