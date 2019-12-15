import { AWSEC2 } from "./ec2";
import { EC2 } from "aws-sdk";
import { $log } from "ts-log-debug";
const CIDR_BLOCK = "0.0.0.0/0";

export class AWSNatGateway {
    private EC2Instance: EC2;
    public readonly eipId?: string;
    public readonly subnetId?: string;

    constructor() {
        // fields?: { eipId?: string; subnetId?: string }
        this.EC2Instance = AWSEC2.getInstance();
        // this.eipId = fields?.eipId;
        // this.subnetId = fields?.subnetId;
    }

    describeNatGateways = (subnetId: string) =>
        this.EC2Instance.describeNatGateways({
            Filter: this.createNatGatewayDeleteFilters(subnetId)
        }).promise();

    createNatGateway = (eipId: string, subnetId: string) =>
        this.EC2Instance.createNatGateway({
            AllocationId: eipId,
            SubnetId: subnetId
        }).promise();

    createRoute = (natgwId: string, rtbId: string) =>
        this.EC2Instance.createRoute({
            DestinationCidrBlock: CIDR_BLOCK,
            NatGatewayId: natgwId,
            RouteTableId: rtbId
        }).promise();

    createNatGatewayDeleteFilters = (subnetId: string): EC2.FilterList => [
        { Name: "subnet-id", Values: [subnetId] },
        { Name: "state", Values: ["available"] }
    ];

    deleteNatGateways = (natgwId: string) =>
        this.EC2Instance.deleteNatGateway({
            NatGatewayId: natgwId
        }).promise();

    createRouteTablesDescribeFilters = (subnetId: string): EC2.FilterList => [
        { Name: "association.subnet-id", Values: [subnetId] }
    ];

    describeRouteTables = (subnetId: string) =>
        this.EC2Instance.describeRouteTables({
            Filters: this.createRouteTablesDescribeFilters(subnetId)
        }).promise();

    deleteRoute = (routeTableId: string) =>
        this.EC2Instance.deleteRoute({
            DestinationCidrBlock: CIDR_BLOCK,
            RouteTableId: routeTableId
        }).promise();

    waitForNatgwAvailable = (natgwId: string) =>
        this.EC2Instance.waitFor("natGatewayAvailable", {
            NatGatewayIds: [natgwId]
        }).promise();
}
