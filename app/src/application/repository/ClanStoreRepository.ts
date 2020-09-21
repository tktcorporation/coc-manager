import { ClanEntity } from "@src/infrastructure/dao/clan/Clan";
import { ClanStore } from "@src/domain/ClanStore";
import { Band } from "@src/domain/Band";

export class ClanStoreRepository {
    getByTag = async (tag: string) => {
        const result = await ClanEntity.findOneOrFail({ tag });
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
