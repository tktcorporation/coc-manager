import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    Column
} from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { MemberEntity } from "./Member";
import { WarEntity } from "./War";
import { BandEntity } from "./Band";

@Entity({ name: "clan" })
export class ClanEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id?: PrimaryGeneratedColumnUUIDOptions;

    @OneToMany(
        () => MemberEntity,
        member => member.clan,
        { cascade: true, eager: true }
    )
    public members?: MemberEntity[];

    @OneToOne(
        () => WarEntity,
        war => war.clan,
        { cascade: true, eager: true }
    )
    public war?: WarEntity;

    @OneToOne(
        () => BandEntity,
        band => band.clan,
        { cascade: true, eager: true }
    )
    public band?: BandEntity;

    @Column()
    public tag: string;

    constructor(tag: string) {
        super();
        this.tag = tag;
    }
}
