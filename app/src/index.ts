import $log from "@src/infrastructure/logger";
import { ConnectionManager } from "@src/infrastructure/connectionManager";
import {
    stopNatgw,
    startNatgw,
} from "./application/services/natGateway/NatGatewaySwitchService";
import { Config } from "./app.config";
import { ClanTag } from "./domain/ClanTag";
import { AttackAlarmForLineControlller } from "./application/usecase/attackAlarm";
import { AttackAlarmCoordinator } from "./application/coordinator/attackAlarmCoordinator";
import { ClanWarService } from "./application/services/coc/clanWar/ClanWarService";
import { LineNotifyService } from "./application/services/coc/lineNotifyService";
import { CocApi } from "./infrastructure/http/cocApi/cocApi";
import { LineNotify } from "./infrastructure/http/line/lineNotifyApi";

const clanTag = new ClanTag(Config.CLAN_TAG);
const cocApiToken = Config.COC_API_TOKEN;

// const connect = async () => {
//     await ConnectionManager.createConnection();
// };

export const checkClanWarStatus = async () => {
    try {
        // await connect();
        await new AttackAlarmForLineControlller(
            new AttackAlarmCoordinator(
                new ClanWarService(new CocApi(cocApiToken)),
                new LineNotifyService(
                    new LineNotify(Config.LINE_NOTIFY_API_TOKEN)
                )
            )
        ).sendStatus(clanTag);
    } catch (error) {
        $log.fatal(error);
    }
};
export const attackAlarm = async () => {
    try {
        // await connect();
        const coordinator = await new AttackAlarmForLineControlller(
            new AttackAlarmCoordinator(
                new ClanWarService(new CocApi(cocApiToken)),
                new LineNotifyService(
                    new LineNotify(Config.LINE_NOTIFY_API_TOKEN)
                )
            )
        );
        await coordinator.inWarAndInTimeToNotify(clanTag);
        await coordinator.inWarToNotifyMemberList(clanTag);
        // await new AttackAlarm().toBand(clanTag);
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
