import { LineNotify } from "@src/infrastructure/http/lineNotifyApi";
import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
import { CocApi } from "@src/infrastructure/http/cocApi";

export class LineNotifyService {
    inWarAndInTimeToNotify = async (
        currentWar: CurrentWar,
        alertHours: number[] = [1, 3, 6, 12, 24]
    ) => {
        if (!currentWar.isInWar) return;
        const message = currentWar.alertMessage(alertHours);
        if (!message) return;
        return await LineNotify.post(message);
    };
}
