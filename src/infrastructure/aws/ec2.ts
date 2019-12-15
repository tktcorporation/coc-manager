import { EC2 } from "aws-sdk";

export class AWSEC2 {
    private static instance?: EC2;
    public static getInstance = () =>
        AWSEC2.instance || AWSEC2.createInstance();
    private static createInstance = () => (AWSEC2.instance = new EC2());
}
