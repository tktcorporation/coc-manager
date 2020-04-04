import { AWSNatGateway } from "../../infrastructure/aws/natGateway";
import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { DescribeNatgw } from "./DescribeNatgw";
import { BaseNatgw } from "./BaseNatgw";

export class DeleteNatgw extends BaseNatgw<
    PromiseResult<EC2.DeleteNatGatewayResult, AWSError>
> {
    constructor(result: DeleteNatgw["result"]) {
        super(result);
    }

    static newByNatgwId = async (natgwId: string) =>
        new DeleteNatgw(await DeleteNatgw.natgw.deleteNatGateways(natgwId));

    static newBySubnetId = async (subnetId: string) =>
        DeleteNatgw.newByNatgwId(
            (await DescribeNatgw.bySubnetId(subnetId)).getFirstNatgwId()!
        );
}
