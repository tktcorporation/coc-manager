import { ClanEntity } from "@src/infrastructure/dao/clan/entity/Clan";
import { ClanStore } from "@src/domain/ClanStore";
import { Band } from "@src/domain/Band";
import { ClanStoreRepository } from "@src/application/repository/ClanStoreRepository";
import { ClanTag } from "@src/domain/ClanTag";

export class ClanStoreDao implements ClanStoreRepository {
    getByTag = async (tag: ClanTag) => {
        const result = await ClanEntity.findOneOrFail({ tag: tag.toString() });
        if (!result.band) return new ClanStore(result.tag);
        const band = new Band(
            result.band.id!,
            result.band.accessToken,
            result.band.bandKey,
            result.band.postKey
        );
        return new ClanStore(result.tag, band);
    };
}
