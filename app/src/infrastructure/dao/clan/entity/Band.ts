import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToOne,
    JoinColumn
} from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { ClanEntity } from "./Clan";

@Entity({ name: "band" })
export class BandEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id?: string;

    @Column()
    public accessToken: string;

    @Column()
    public postKey?: string;

    @Column()
    public bandKey: string;

    @OneToOne(
        () => ClanEntity,
        clan => clan.band
    )
    @JoinColumn()
    public clan!: ClanEntity;

    constructor(accessToken: string, bandkey: string) {
        super();
        this.accessToken = accessToken;
        this.bandKey = bandkey;
    }
}
