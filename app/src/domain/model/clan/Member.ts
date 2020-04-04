import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne
} from "typeorm";
import { ClanEntity } from "./Clan";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";

@Entity({ name: "member" })
export class MemberEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public readonly id?: PrimaryGeneratedColumnUUIDOptions;

    @ManyToOne(
        () => ClanEntity,
        clan => clan.members
    )
    public clan: ClanEntity;

    @Column()
    public readonly name!: string;

    @Column()
    public readonly memberTag!: string;

    @Column()
    public trophies: number;

    @Column()
    public attackWins: number;

    @Column()
    public versusBattleWins: number;

    @Column()
    public warStars: number;

    @Column()
    public donationsReceived: number;

    @Column()
    public donations: number;

    @Column()
    public versusTrophies: number;

    constructor(
        clan: ClanEntity,
        name: string,
        memberTag: string,
        trophies: number,
        attackWins: number,
        versusBattleWins: number,
        warStars: number,
        donations: number,
        donationsReceived: number,
        versusTrophies: number
    ) {
        super();
        this.clan = clan;
        this.name = name;
        this.memberTag = memberTag;
        this.trophies = trophies;
        this.attackWins = attackWins;
        this.versusBattleWins = versusBattleWins;
        this.warStars = warStars;
        this.donations = donations;
        this.donationsReceived = donationsReceived;
        this.versusTrophies = versusTrophies;
    }
}
