import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { Time } from "@src/domain/Time";

export interface ILineNotify {
    sendMessage: (
        message: string
    ) => Promise<{ status: number; message: string }>;
}

export class LineNotifyService {
    constructor(private lineNotifier: ILineNotify) {}
    inWarAndInTimeToNotify = async (
        currentWar: CurrentWar,
        alertHours: number[],
        time: Time
    ) => {
        if (!currentWar.isInWar) return;
        if (!currentWar.warProperties)
            throw new Error("warProperties is not found");
        const hourClosedTo = currentWar.warProperties.hourCloseTo(
            alertHours,
            time
        );
        if (!hourClosedTo) throw new Error("the time is not close to");
        const message = currentWar.warProperties.alertMessage(hourClosedTo);
        return await this.lineNotifier.sendMessage(message);
    };
}
