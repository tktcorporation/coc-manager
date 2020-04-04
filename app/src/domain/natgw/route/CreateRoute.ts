import { AWSNatGateway } from "../../../infrastructure/aws/natGateway";
import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { DescribeRouteTables } from "./DescribeRouteTables";
import { BaseNatgw } from "../BaseNatgw";

export class CreateRoute extends BaseNatgw<
    PromiseResult<EC2.CreateRouteResult, AWSError>
> {
    constructor(result: CreateRoute["result"]) {
        super(result);
    }

    static newByNatgwIdAndRtbId = async (natgwId: string, rtbId: string) =>
        new CreateRoute(await CreateRoute.natgw.createRoute(natgwId, rtbId));

    static newBySubnetId = async (natgwId: string, subnetId: string) =>
        CreateRoute.newByNatgwIdAndRtbId(
            natgwId,
            (await DescribeRouteTables.newBySubnetId(subnetId)).getFirstRtbId()!
        );
}
