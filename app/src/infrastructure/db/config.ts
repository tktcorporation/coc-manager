// import * as dotenv from 'dotenv';
// dotenv.config();

interface DbConfig {
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
}
const dbconfig: DbConfig = {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    database: process.env.DB_DATABASE!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!
};
export default dbconfig;
