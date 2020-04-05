// import { CurrentWar } from "@src/domain/currentWar/CurrentWar";
// import { CocApi } from "@src/infrastructure/http/cocApi";

// export const bandAttackAlearm = async (clanTag: string) => {
//     const cocApi = new CocApi(process.env.COC_API_TOKEN!);
//     const currentWar = new CurrentWar(await cocApi.getClanWarByTag(clanTag));
//     if (!currentWar.isInWar) return;

//     // for Band
//     if (currentWar.isCloseToStartOfPrepare()) await this.deletePost();
//     if (currentWar.isCloseToStart())
//         await this.createPostAndSave(war.createWarPostBody());

//     const message = currentWar.alertMessage([1, 3, 6, 12, 24]);
//     if (message == "") return;
//     await this.pushComment(message).catch(() => this.refreshPost(war));
// };
