import { ClanWarService } from "./ClanWar";
import { Config } from "@src/app.config";
import { ClanTag } from "@src/domain/ClanTag";
import { CocApiMock } from "@src/infrastructure/http/cocApi/cocApi.mock";

describe("ClanWar", () => {
    const clanWarService = new ClanWarService(new CocApiMock());
    it("getCurrentByTag", async () => {
        const currentWar = await clanWarService.getCurrentByTag(
            new ClanTag(Config.CLAN_TAG)
        );
        expect(typeof currentWar.isInWar).toBe("boolean");
    });
});
