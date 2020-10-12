import { AttackAlarmCoordinator } from "./attackAlarmCoordinator";
import { ClanWarService } from "../services/coc/clanWar/ClanWarService";
import { CocApiMock } from "@src/infrastructure/http/cocApi/cocApi.mock";
import { LineNotifyService } from "../services/coc/lineNotifyService";
import { LineNotify } from "@src/infrastructure/http/line/lineNotifyApi";
import { Config } from "@src/app.config";
import { ClanTag } from "@src/domain/ClanTag";
import { Time } from "@src/domain/core/Time";

describe("attackAlarmCoordinator", () => {
    const coordinator = new AttackAlarmCoordinator(
        new ClanWarService(new CocApiMock()),
        new LineNotifyService(new LineNotify(Config.LINE_NOTIFY_API_TOKEN))
    );
    it("sendStatus", async () => {
        await coordinator.sendStatus(new ClanTag(Config.CLAN_TAG));
    });
    it("sendStatus", async () => {
        await coordinator.inWarAndInTimeToNotify(
            new ClanTag(Config.CLAN_TAG),
            [...Array(24).keys()].map((i) => ++i),
            new Time()
        );
    });
});
