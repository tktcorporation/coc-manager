import { CocApi } from "./cocApi";
import { Config } from "@src/app.config";
import { ClanTag } from "@src/domain/ClanTag";

describe("ClanWar", () => {
    const cocApi = new CocApi(Config.COC_API_TOKEN);

    it("getCurrentByTag", async () => {
        const currentWar = await cocApi.getClanWarByTag(
            new ClanTag(Config.CLAN_TAG)
        );
        expect(typeof currentWar.state.isInWar).toBe("boolean");
    });
    it("getCurrentByTag", async () => {
        const clan = await cocApi.getClanByTag(new ClanTag(Config.CLAN_TAG));
        expect(typeof clan.name).toBe("string");
    });
});
