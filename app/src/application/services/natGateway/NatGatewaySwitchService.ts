import { Natgw } from "../../../domain/natgw/Natgw";
import { RouteTable } from "../../../domain/natgw/route/RouteTable";
import { $log } from "ts-log-debug";

const eipId = process.env.EIP_ID;
const subnetId = process.env.SUBNET_ID;

export const stopNatgw = async () => {
    if (!eipId || !subnetId) return;
    $log.debug(await RouteTable.detach(subnetId));
    return Natgw.stop(subnetId);
};

export const startNatgw = async () => {
    if (!eipId || !subnetId) return;
    const started = await Natgw.start(eipId, subnetId);
    $log.debug(started.result.NatGateway);
    const natgw = await started.waitForNatgwAvailable();
    $log.debug(natgw.result.NatGateways);
    return RouteTable.attach(natgw.getFirstNatgwId()!, subnetId);
};
