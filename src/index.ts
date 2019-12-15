import $log from "./infrastructure/logger";
import { ConnectionManager } from "./infrastructure/connectionManager";
import { CurrentWarService } from "./application/services/clan/checkCurrentWar";
import {
    stopNatgw,
    startNatgw
} from "./application/services/natGateway/NatGatewaySwitchService";

const connect = async () => {
    await ConnectionManager.createConnection();
};

export const checkClanWarStatus = async () => {
    try {
        await startNatgw();
        await connect();
        await new CurrentWarService().checkStatus();
        await stopNatgw();
    } catch (error) {
        $log.fatal(error);
    }
};
export const attackAlarm = async () => {
    try {
        // $log.info(await startNatgw());
        $log.info(await connect());
        $log.info(await new CurrentWarService().attackAlarm());
        // $log.info(await stopNatgw());
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
// export const refreshPost = async () => {
//     try {
//         await startNatgw();
//         await connect();
//         await new CurrentWarService().refreshPostDirect();
//         await stopNatgw();
//     } catch (error) {
//         $log.fatal(error);
//     }
// };

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
