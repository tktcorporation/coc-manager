import { WarMember } from "./WarMember";

export class WarMembers {
    items: WarMember[];
    constructor(warMembers: WarMember[]) {
        this.items = warMembers;
    }
    get memberNameArray(): string[] {
        return this.items.map((v) => v.getName());
    }
}
