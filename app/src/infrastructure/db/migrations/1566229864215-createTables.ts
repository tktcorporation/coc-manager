import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1566229864215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `member` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `memberTag` varchar(255) NOT NULL, `trophies` int NOT NULL, `attackWins` int NOT NULL, `versusBattleWins` int NOT NULL, `warStars` int NOT NULL, `donationsReceived` int NOT NULL, `donations` int NOT NULL, `versusTrophies` int NOT NULL, `clanId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `war` (`id` varchar(36) NOT NULL, `startTime` datetime NOT NULL, `endTime` datetime NOT NULL, `clanId` varchar(36) NULL, UNIQUE INDEX `REL_7fb4aa8a7f4e4d7111b291fb2e` (`clanId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clan` (`id` varchar(36) NOT NULL, `tag` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `band` (`id` varchar(36) NOT NULL, `postKey` varchar(255) NOT NULL, `bandKey` varchar(255) NOT NULL, `clanId` varchar(36) NULL, UNIQUE INDEX `REL_63ac45193b215a0c09539a1b1c` (`clanId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `FK_6b53d0af1490671a01a9ff38687` FOREIGN KEY (`clanId`) REFERENCES `clan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `war` ADD CONSTRAINT `FK_7fb4aa8a7f4e4d7111b291fb2e7` FOREIGN KEY (`clanId`) REFERENCES `clan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `band` ADD CONSTRAINT `FK_63ac45193b215a0c09539a1b1c8` FOREIGN KEY (`clanId`) REFERENCES `clan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `band` DROP FOREIGN KEY `FK_63ac45193b215a0c09539a1b1c8`");
        await queryRunner.query("ALTER TABLE `war` DROP FOREIGN KEY `FK_7fb4aa8a7f4e4d7111b291fb2e7`");
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `FK_6b53d0af1490671a01a9ff38687`");
        await queryRunner.query("DROP INDEX `REL_63ac45193b215a0c09539a1b1c` ON `band`");
        await queryRunner.query("DROP TABLE `band`");
        await queryRunner.query("DROP TABLE `clan`");
        await queryRunner.query("DROP INDEX `REL_7fb4aa8a7f4e4d7111b291fb2e` ON `war`");
        await queryRunner.query("DROP TABLE `war`");
        await queryRunner.query("DROP TABLE `member`");
    }

}
