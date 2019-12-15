import { options } from "./db/typeOrmOptions";
import {
    Connection,
    BaseEntity,
    createConnection,
    getConnection
} from "typeorm";

export class ConnectionManager {
    public static async createConnection() {
        if (!this.conn) {
            this.conn = await createConnection(options);
        }
        BaseEntity.useConnection(this.conn);
        return this.conn;
    }
    public static getConnection = () => createConnection();
    private static conn: Connection;
}
