import dbconfig from "./config";
import { ConnectionOptions } from "typeorm";
import { MemberEntity } from "../../domain/model/clan/Member";
import { ClanEntity } from "../../domain/model/clan/Clan";
import { WarEntity } from "../../domain/model/clan/War";
import { BandEntity } from "../../domain/model/clan/Band";

export const options: ConnectionOptions = {
    type: "mysql",
    host: dbconfig.host,
    port: Number.parseInt(dbconfig.port, 10),
    username: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    entities: [
        // '../models/*.ts',
        // '../models/*.js',
        MemberEntity,
        ClanEntity,
        WarEntity,
        BandEntity
    ],
    // migrations: ['src/db/migrations/**/*.ts'],
    // subscribers: ['src/db/subscribers/**/*.ts'],
    // cli: {
    //     entitiesDir: 'src/models',
    //     migrationsDir: 'src/db/migrations',
    //     subscribersDir: 'src/db/subscribers',
    // },
    synchronize: false,
    logging: process.env.NODE_ENV === "production" ? ["error"] : "all"
};
