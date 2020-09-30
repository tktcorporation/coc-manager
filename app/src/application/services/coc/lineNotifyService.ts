import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { Time } from "@src/domain/core/Time";
import { ClanTag } from "@src/domain/ClanTag";
import { ICocApi } from "./clanWar/ClanWarService";

export interface ILineNotify {
    sendMessage: (
        message: string
    ) => Promise<{ status: number; message: string }>;
}

export class LineNotifyService {
    constructor(private lineNotifier: ILineNotify) {}

    sendMessage = async (
        message: string
    ): Promise<{
        status: number;
        message: string;
    }> => await this.lineNotifier.sendMessage(message);
}
