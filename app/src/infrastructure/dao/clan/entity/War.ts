import {
    BaseEntity,
    Column,
    OneToOne,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn
} from "typeorm";
import { ClanEntity } from "./Clan";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";

@Entity({ name: "war" })
export class WarEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id?: PrimaryGeneratedColumnUUIDOptions;

    @Column()
    public startTime!: Date;
    @Column()
    public endTime!: Date;

    @OneToOne(
        type => ClanEntity,
        clan => clan.war
    )
    @JoinColumn()
    public clan!: ClanEntity;

    constructor(fields: { clan: ClanEntity; startTime: Date; endTime: Date }) {
        super();
        if (!fields) {
            return;
        }
        this.clan = fields.clan;
        this.startTime = fields.startTime;
        this.endTime = fields.endTime;
    }
}
