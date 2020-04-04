import { DeleteRoute } from "./DeleteRoute";
import { CreateRoute } from "./CreateRoute";
export class RouteTable {
    static attach = (natgwId: string, subnetId: string) =>
        CreateRoute.newBySubnetId(natgwId, subnetId);
    static detach = (subnetId: string) => DeleteRoute.newBySubnetId(subnetId);
}
