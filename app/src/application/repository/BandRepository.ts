import { Band } from "@src/domain/Band";

export interface BandRepository {
    getById: (id: string) => Promise<Band>;
    update: (band: Band) => Promise<void>;
}
