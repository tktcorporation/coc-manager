import { AWSNatGateway } from "../../infrastructure/aws/natGateway";
import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { BaseNatgw } from "./BaseNatgw";

export class DescribeNatgw extends BaseNatgw<
    PromiseResult<EC2.DescribeNatGatewaysResult, AWSError>
> {
    constructor(result: DescribeNatgw["result"]) {
        super(result);
    }
    getFirstNatgwId = () => this.result.NatGateways?.[0].NatGatewayId;

    static bySubnetId = async (subnetId: string) =>
        new DescribeNatgw(
            await DescribeNatgw.natgw.describeNatGateways(subnetId)
        );
}
