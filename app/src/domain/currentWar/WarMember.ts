export class WarMember {
    constructor(
        private tag: string,
        private name: string,
        private mapPosition: number,
        private townhallLevel: number,
        private opponentAttacks: number,
        private bestOpponentAttack: {
            order: number;
            attackerTag: string;
            defenderTag: string;
            stars: number;
            destructionPercentage: number;
        },
        private attacks: [
            {
                order: number;
                attackerTag: string;
                defenderTag: string;
                stars: number;
                destructionPercentage: number;
            }
        ]
    ) {}

    getName = (): string => this.name;
}
