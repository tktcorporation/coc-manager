import { AWSNatGateway } from "../../../infrastructure/aws/natGateway";
import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { DescribeRouteTables } from "./DescribeRouteTables";
import { BaseNatgw } from "../BaseNatgw";

export class DeleteRoute extends BaseNatgw<
    PromiseResult<EC2.DeleteNatGatewayResult, AWSError>
> {
    constructor(result: DeleteRoute["result"]) {
        super(result);
    }

    static newByRtbId = async (rtbId: string) =>
        new DeleteRoute(await DeleteRoute.natgw.deleteRoute(rtbId));

    static newBySubnetId = async (subnetId: string) =>
        DeleteRoute.newByRtbId(
            (await DescribeRouteTables.newBySubnetId(subnetId)).getFirstRtbId()!
        );
}
