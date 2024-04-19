import { BigNumberish } from "starknet"
import { useDojoComponents } from "../dojo/DojoContext"
import { useEntityKeys } from "./useEntityHook"
import { useComponentValue } from "@dojoengine/react";
import { bigintToEntity } from "../utils/type"
import { useMemo } from "react";

export const useAllGameIds = () => {
    const { Game } = useDojoComponents()
    const gameIds: bigint[] = useEntityKeys(Game, 'game_id')
    return {
        gameIds,
    }
}

export const useGame = (game_id: bigint | number) => {
    const {Game} = useDojoComponents();

    const game: any = useComponentValue(Game, bigintToEntity(game_id));

    const gameId = useMemo(()=> (game?.game_id ?? 0n), [game]);
    const player_a = useMemo(()=>(game?.player_a ?? 0n), [game]);
    const player_b = useMemo(()=>(game?.player_b ?? 0n), [game]);
    const active_blobert_a = useMemo(()=>(game?.active_blobert_a ?? 0n), [game]);
    const active_blobert_b = useMemo(()=>(game?.active_blobert_b ?? 0n), [game]);
    const turn = useMemo(()=>(game?.turn ?? 0n), [game]);


    return {
        gameId,
        player_a,
        player_b,
        active_blobert_a,
        active_blobert_b,
        turn
    }
    
}