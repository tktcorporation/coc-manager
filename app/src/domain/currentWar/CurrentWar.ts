import { WarClan } from "./WarClan";
import { WarProperties } from "./warProperties/WarProperties";
import { WarState } from "./warState/WarState";

export class CurrentWar {
    public readonly clan: WarClan;
    public readonly warProperties?: WarProperties;
    public readonly state: WarState;

    constructor(args: {
        clan: WarClan;
        warProperties?: WarProperties;
        state: WarState;
    }) {
        this.clan = args.clan;
        this.state = args.state;
        this.warProperties = args.warProperties;
    }

    createWarPostBody = (): string => {
        if (!this.warProperties) throw new Error("warProperties is undefined.");
        return this.warProperties.warInfoText() + this.warMemberText();
    };

    private warMemberText = (): string => {
        const members = this.clan.members;
        return (
            `参加メンバー:` +
            (members === undefined
                ? "nobody"
                : members.map((member) => `\n・${member.getName()}`).join(""))
        );
    };
}
