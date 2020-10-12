import { WarState, WarStateValue } from "./WarState";

describe("WarState", () => {
    it("initialize", () => {
        expect(new WarState(WarStateValue.In)).toBeDefined();
    });
    describe("isInWar", () => {
        it("in", () => {
            const state = new WarState(WarStateValue.In);
            expect(state.isInWar).toBeTruthy();
        });
        it("ended", () => {
            const state = new WarState(WarStateValue.Ended);
            expect(state.isInWar).toBeFalsy();
        });
        it("not", () => {
            const state = new WarState(WarStateValue.notIn);
            expect(state.isInWar).toBeFalsy();
        });
    });
});
