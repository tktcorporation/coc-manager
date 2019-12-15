import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { BaseNatgw } from "./BaseNatgw";
import { DescribeNatgw } from "./DescribeNatgw";

export class CreateNatgw extends BaseNatgw<
    PromiseResult<EC2.CreateNatGatewayResult, AWSError>
> {
    constructor(result: CreateNatgw["result"]) {
        super(result);
    }

    static newByEipIdAndSubnetId = async (eipId: string, subnetId: string) =>
        new CreateNatgw(
            await CreateNatgw.natgw.createNatGateway(eipId, subnetId)
        );

    getId = async () => (await this.result).NatGateway?.NatGatewayId;

    waitForNatgwAvailable = async () =>
        new DescribeNatgw(
            await CreateNatgw.natgw.waitForNatgwAvailable((await this.getId())!)
        );
}
