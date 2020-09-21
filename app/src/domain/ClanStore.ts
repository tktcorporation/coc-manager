import { Band } from "./Band";

export class ClanStore {
    band?: Band;
    constructor(public tag: string, band?: Band) {}
}
