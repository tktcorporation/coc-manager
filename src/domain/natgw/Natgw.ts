import { DeleteNatgw } from "./DeleteNatgw";
import { CreateNatgw } from "./CreateNatgw";

export class Natgw {
    static start = (eipId: string, subnetId: string) =>
        CreateNatgw.newByEipIdAndSubnetId(eipId, subnetId);
    static stop = (subnetId: string) => DeleteNatgw.newBySubnetId(subnetId);
}
