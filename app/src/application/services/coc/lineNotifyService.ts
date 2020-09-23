import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";

export class LineNotifyService {
    inWarAndInTimeToNotify = async (
        currentWar: CurrentWar,
        alertHours: number[] = [1, 3, 6, 12, 24]
    ) => {
        if (!currentWar.isInWar) return;
        const message = currentWar.alertMessage(alertHours);
        if (!message) return;
        return await new LineNotify().sendMessage(message);
    };
}
