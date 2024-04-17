import { useComponentValue } from "@dojoengine/react";
import { useDojoComponents } from "../dojo/DojoContext"
import { bigintToEntity } from "../utils/type";
import { useMemo } from "react";

export const useBlobertLineup = (address: bigint | string) => {
    const { BlobertLineup } = useDojoComponents();

    const blobertLineup: any = useComponentValue(BlobertLineup, bigintToEntity(address));

    const blobert_1 = useMemo(() => (blobertLineup?.blobert_1 ?? 0n), [blobertLineup])
    const blobert_2 = useMemo(() => (blobertLineup?.blobert_2 ?? 0n), [blobertLineup])
    const blobert_3 = useMemo(() => (blobertLineup?.blobert_3 ?? 0n), [blobertLineup])
    const blobert_4 = useMemo(() => (blobertLineup?.blobert_4 ?? 0n), [blobertLineup])
    const blobert_5 = useMemo(() => (blobertLineup?.blobert_5 ?? 0n), [blobertLineup])
    const blobert_6 = useMemo(() => (blobertLineup?.blobert_6 ?? 0n), [blobertLineup])

    return {
       blobert_1, 
       blobert_2,
       blobert_3,
       blobert_4,
       blobert_5,
       blobert_6
    }
}