import { BandEntity } from "@src/dao/clan/Band";
import { Band } from "@src/domain/Band";

export class BandRepository {
    getById = async (id: string) => {
        const result = await BandEntity.findOneOrFail({ id });
        return new Band(
            result.id!,
            result.accessToken,
            result.bandKey,
            result.postKey
        );
    };
    update = async (band: Band) => {
        const entity = await BandEntity.findOneOrFail({ id: band.id });
        entity.bandKey = band.bandKey;
        entity.postKey = band.postKey;
        entity.accessToken = entity.accessToken;
        await entity.save();
    };
}
