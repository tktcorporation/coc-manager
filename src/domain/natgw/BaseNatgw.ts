import { AWSNatGateway } from "../../infrastructure/aws/natGateway";

export abstract class BaseNatgw<T> {
    protected static natgw = new AWSNatGateway();
    public result: T;
    constructor(result: T) {
        this.result = result;
    }
}
