import React, { useEffect, useState } from 'react';
import { useAllGameIds, useGame } from '../hooks/useGame';

interface Match {
    player_a: string,
    player_b: string
}

export const CurrentLookingBoard = () => {
    const [match, setMatch] = useState<Match[]>([]);
    // Sample data
    const matches: Match[] = [
        { player_a: 'Alice', player_b: '' },
        { player_a: 'Bob', player_b: '' },
        // Add more matches as needed
    ];

    const {gameIds} = useAllGameIds();

    useEffect(()=>{
        gameIds.map((id, index)=>{
            const {gameId, player_a, player_b} = useGame(id);
            console.log(gameId)
            matches.push({player_a: player_a, player_b: player_b});
            setMatch(matches)
        })
    }, [])

    return (
        <div>
            <h1>Current Matches</h1>
            <ul>
                {match.map((match, index) => (
                    <li key={index}>
                        {match.player_a} vs {match.player_b ? match.player_b : 'Waiting for opponent...'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

