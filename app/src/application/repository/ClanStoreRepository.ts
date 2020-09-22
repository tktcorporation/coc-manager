import { ClanStore } from "@src/domain/ClanStore";
import { ClanTag } from "@src/domain/ClanTag";

export interface ClanStoreRepository {
    getByTag: (tag: ClanTag) => Promise<ClanStore>;
}
