import { overridableComponent } from "@dojoengine/recs";
import { ContractComponents } from "./generated/contractComponents";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
    contractComponents,
}: {
    contractComponents: ContractComponents;
}) {
    return {
        ...contractComponents,
        BlobertOne: overridableComponent(contractComponents.BlobertOne),
        BlobertTwo: overridableComponent(contractComponents.BlobertTwo),
        BlobertThree: overridableComponent(contractComponents.BlobertThree),
        BlobertFour: overridableComponent(contractComponents.BlobertFour),
        BlobertFive: overridableComponent(contractComponents.BlobertFive),
        BlobertSix: overridableComponent(contractComponents.BlobertSix),
        Player: overridableComponent(contractComponents.Player),
    };
}
