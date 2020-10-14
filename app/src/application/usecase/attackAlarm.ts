import { ClanTag } from "@src/domain/ClanTag";
import { Time } from "@src/domain/core/Time";
import { AttackAlarmCoordinator } from "../coordinator/attackAlarmCoordinator";

export class AttackAlarmForLineControlller {
    constructor(private attackAlarmCoordinator: AttackAlarmCoordinator) {}

    inWarAndInTimeToNotify = async (
        clanTag: ClanTag,
        alertHours: number[] = [1, 3, 6, 12]
    ): Promise<void> => {
        await this.attackAlarmCoordinator.inWarAndInTimeToNotify(
            clanTag,
            alertHours,
            new Time()
        );
    };

    inWarToNotifyMemberList = async (
        clanTag: ClanTag,
        alertHour: number = 24
    ): Promise<void> => {
        await this.attackAlarmCoordinator.inWarToNotifyMemberList(
            clanTag,
            alertHour,
            new Time()
        );
    };

    sendStatus = async (clanTag: ClanTag) =>
        this.attackAlarmCoordinator.sendStatus(clanTag);
}

// export class AttackAlarmForBand {
//     constructor(
//         private clanStoreRepository: ClanStoreRepository,
//         private bandService: BandService,
//         private cocApi: ICocApi
//     ) {}

//     toBand = async (clanTag: ClanTag) => {
//         const currentWar = await this.cocApi.getClanWarByTag(clanTag);

//         if (currentWar.warProperties?.isCloseToStartOfPrepare(new Time()))
//             await this.bandService.deletePost();
//         if (currentWar.warProperties?.isCloseToStart(new Time()))
//             await this.bandService.createPostAndSave(
//                 currentWar.createWarPostBody()
//             );
//         await this.bandService.inWarAndInTimeToNotify(currentWar);
//     };

//     refreshPost = async (clanTag: ClanTag) => {
//         const clan = await this.clanStoreRepository.getByTag(clanTag);
//         if (!clan.band) return;
//         const currentWar = await this.cocApi.getClanWarByTag(clanTag);
//         await this.bandService.refreshPost(currentWar);
//     };
// }
