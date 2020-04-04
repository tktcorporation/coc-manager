import { PromiseResult } from "aws-sdk/lib/request";
import { EC2, AWSError } from "aws-sdk";
import { BaseNatgw } from "../BaseNatgw";
import { DescribeNatgw } from "../DescribeNatgw";

export class DescribeRouteTables extends BaseNatgw<
    PromiseResult<EC2.DescribeRouteTablesResult, AWSError>
> {
    constructor(result: DescribeRouteTables["result"]) {
        super(result);
    }

    static newBySubnetId = async (subnetId: string) =>
        new DescribeRouteTables(
            await DescribeNatgw.natgw.describeRouteTables(subnetId)
        );

    getFirstRtbId = () =>
        this.result.RouteTables?.[0].Associations?.[0].RouteTableId;
}
