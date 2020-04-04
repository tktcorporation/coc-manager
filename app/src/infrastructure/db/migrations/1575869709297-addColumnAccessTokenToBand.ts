import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnAccessTokenToBand1575869709297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `band` ADD `accessToken` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `band` DROP COLUMN `accessToken`");
    }

}
