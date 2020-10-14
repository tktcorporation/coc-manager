import { WarMember } from "./WarMember";
import { ClanTag } from "../ClanTag";
import { WarMembers } from "./WarMembers";

export class WarClan {
    constructor(
        private destructionPercentage: {} | undefined,
        private tag: ClanTag | undefined,
        private name: string | undefined,
        private badgeUrls: {},
        private clanLevel: number,
        private attacks: number,
        private stars: number,
        private expEarned: number | undefined,
        public readonly members: WarMembers | undefined
    ) {}
}
