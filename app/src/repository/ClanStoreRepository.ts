import { ClanEntity } from "@src/dao/clan/Clan";
import { ClanStore } from "@src/domain/ClanStore";

export class ClanStoreRepository {
    getByTag = async (tag: string) => {
        const result = await ClanEntity.findOneOrFail({ tag });
        return new ClanStore(result.tag);
    };
}
