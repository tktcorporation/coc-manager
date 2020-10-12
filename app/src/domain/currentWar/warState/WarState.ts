export const WarStateValue = {
    notIn: "notInWar",
    In: "inWar",
    Ended: "warEnded",
} as const;
export type WarStateValue = typeof WarStateValue[keyof typeof WarStateValue];

export class WarState {
    constructor(private value: WarStateValue) {}

    get isInWar(): boolean {
        return this.value === WarStateValue.In;
    }

    toString = () => this.value;
}
