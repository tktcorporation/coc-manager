export class Band {
    constructor(
        public readonly id: string,
        public readonly accessToken: string,
        public bandKey: string,
        public postKey?: string
    ) {}
}
