import $log from "@src/infrastructure/logger";
import { ConnectionManager } from "@src/infrastructure/connectionManager";
import {
    stopNatgw,
    startNatgw
} from "./application/services/natGateway/NatGatewaySwitchService";
import { AttackAlarm } from "./application/usecase/attackAlarm";

const clanTag = process.env.CLAN_TAG!;
const token = process.env.COC_API_TOKEN!;

const connect = async () => {
    await ConnectionManager.createConnection();
};

export const checkClanWarStatus = async () => {
    try {
        await connect();
        await AttackAlarm.checkStatus(token, clanTag);
    } catch (error) {
        $log.fatal(error);
    }
};
export const attackAlarm = async () => {
    try {
        await connect();
        await AttackAlarm.toLine(token, clanTag);
        await AttackAlarm.toBand(token, clanTag);
    } catch (error) {
        $log.fatal(error);
    }
};
// export const createNewPost = async () => {
//     try {
//         await startNatgw();
//         await connect();
//         await new CurrentWarService().createNewPost();
//         await stopNatgw();
//     } catch (error) {
//         $log.fatal(error);
//     }
// };

// TODO: remove
export const refreshPost = async () => {
    try {
        await connect();
        await AttackAlarm.refreshPost(token, clanTag);
    } catch (error) {
        $log.fatal(error);
    }
};

export const startNatGateway = async () => {
    try {
        $log.info(await startNatgw());
    } catch (error) {
        $log.fatal(error);
    }
};

export const stopNatGateway = async () => {
    try {
        $log.info(await stopNatgw());
    } catch (error) {
        $log.fatal(error);
    }
};
