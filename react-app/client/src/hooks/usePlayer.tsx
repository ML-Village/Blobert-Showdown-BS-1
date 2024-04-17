import { useComponentValue } from "@dojoengine/react";
import { useDojoComponents } from "../dojo/DojoContext"
import { bigintToEntity } from "../utils/type";
import { useMemo } from "react";
import { feltToString } from "../utils/starknet";

export const usePlayer = (address: bigint | string) => {
    const { Player } = useDojoComponents();

    const player: any = useComponentValue(Player, bigintToEntity(address));

    const name = useMemo(() => feltToString(player?.name ?? 0n), [player])
    const total_duels = useMemo(() => (player?.total_duels ?? 0), [player])
    const total_wins = useMemo(() => (player?.total_wins ?? 0), [player])
    const total_losses = useMemo(() => (player?.total_losses ?? 0), [player])

    return {
        name,
        total_duels,
        total_wins,
        total_losses
    }
}