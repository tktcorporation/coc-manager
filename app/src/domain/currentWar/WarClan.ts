import { WarMember } from "./WarMember";
import { ClanTag } from "../ClanTag";

export class WarClan {
    constructor(
        private destructionPercentage: {},
        private tag: ClanTag,
        private name: string,
        private badgeUrls: {},
        private clanLevel: number,
        private attacks: number,
        private stars: number,
        private expEarned: number,
        public readonly members: WarMember[]
    ) {}
}
