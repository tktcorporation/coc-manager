import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";

export interface ILineNotify {
    sendMessage: (
        message: string
    ) => Promise<{ status: number; message: string }>;
}

export class LineNotifyService {
    constructor(private lineNotifier: ILineNotify) {}
    inWarAndInTimeToNotify = async (
        currentWar: CurrentWar,
        alertHours: number[]
    ) => {
        if (!currentWar.isInWar) return;
        const message = currentWar.alertMessage(alertHours);
        if (!message) return;
        return await this.lineNotifier.sendMessage(message);
    };
}
