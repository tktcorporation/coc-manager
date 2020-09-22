import dbconfig from "./config";
import { ConnectionOptions } from "typeorm";
import { MemberEntity } from "../dao/clan/entity/Member";
import { ClanEntity } from "../dao/clan/entity/Clan";
import { WarEntity } from "../dao/clan/entity/War";
import { BandEntity } from "../dao/clan/entity/Band";

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
        BandEntity,
    ],
    // migrations: ['src/db/migrations/**/*.ts'],
    // subscribers: ['src/db/subscribers/**/*.ts'],
    // cli: {
    //     entitiesDir: 'src/models',
    //     migrationsDir: 'src/db/migrations',
    //     subscribersDir: 'src/db/subscribers',
    // },
    synchronize: false,
    logging: process.env.NODE_ENV === "production" ? ["error"] : "all",
};
