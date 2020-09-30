import { WarClan } from "./WarClan";
import { WarProperties } from "./WarProperties";

export class CurrentWar {
    public readonly clan: WarClan;
    public readonly warProperties?: WarProperties;
    public readonly state: "notInWar" | "inWar" | "warEnded";

    constructor(args: {
        clan: WarClan;
        warProperties?: WarProperties;
        state: "notInWar" | "inWar" | "warEnded";
    }) {
        this.clan = args.clan;
        this.state = args.state;
        this.warProperties = args.warProperties;
    }

    get isInWar(): boolean {
        return this.state !== "notInWar";
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
