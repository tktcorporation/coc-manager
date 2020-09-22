require("dotenv").config();

export namespace Config {
    if (!process.env.DB_HOST) {
        throw new Error("DB_HOST must be set.");
    }
    if (!process.env.DB_PORT) {
        throw new Error("DB_PORT must be set.");
    }
    if (!process.env.DB_USER) {
        throw new Error("DB_USER must be set.");
    }
    if (!process.env.DB_PASSWORD) {
        throw new Error("DB_PASSWORD must be set.");
    }
    if (!process.env.DB_DATABASE) {
        throw new Error("DB_DATABASE_NAME must be set.");
    }
    if (!process.env.NODE_ENV) {
        throw new Error("NODE_ENV must be set.");
    }
    if (!process.env.DB_TZ) {
        throw new Error("TZ must be set.");
    }
    if (!process.env.LINE_NOTIFY_API_TOKEN) {
        throw new Error("LINE_NOTIFY_API_TOKEN must be set.");
    }
    export const DB_HOST: string = process.env.DB_HOST;
    export const DB_PORT: string = process.env.DB_PORT;
    export const DB_USER: string = process.env.DB_USER;
    export const DB_PASSWORD: string = process.env.DB_PASSWORD;
    export const DB_DATABASE: string = process.env.DB_DATABASE;
    export const NODE_ENV: string = process.env.NODE_ENV;
    export const DB_TZ: string = process.env.DB_TZ;
    export const LINE_NOTIFY_API_TOKEN: string =
        process.env.LINE_NOTIFY_API_TOKEN;
}
