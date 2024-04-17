import { useComponentValue } from "@dojoengine/react";
import { Entity, HasValue } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { Direction, stringToFelt } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { useDojoAccount, useDojoComponents, useDojoSystemCalls } from "./dojo/DojoContext";
import { useEntityKeys, useEntityKeysQuery } from "./hooks/useEntityHook";
import { bigintToEntity } from "./utils/type";
import { usePlayer } from "./hooks/usePlayer";
import { useBlobertLineup } from "./hooks/useBlobertLineup";

function App() {
    const { register_player, choose_blobert } = useDojoSystemCalls()
    const {Player, BlobertLineup} = useDojoComponents();
    const { account, isMasterAccount, masterAccount, isDeploying, create, clear,copyToClipboard,applyFromClipboard,list,select, get, count } = useDojoAccount()
    const {name, total_duels, total_wins, total_losses} = usePlayer(account.address)
    const {blobert_1, blobert_2, blobert_3, blobert_4, blobert_5, blobert_6} = useBlobertLineup(account.address)

    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([
        BigInt(account?.address),
    ]) as Entity;

    // get current component values
    // const player = useComponentValue(Player, entityId);
    // const player_address = useEntityKeysQuery(Player, 'address',[HasValue(Player, { address: BigInt(account.address)})])
    // const player = useComponentValue(Player, bigintToEntity(player_address[0]));
    // const blobert_lineup_adress = useEntityKeysQuery(BlobertLineup, 'address', [HasValue(BlobertLineup, {address: BigInt(account.address)})])
    // const blobert_lineup = useComponentValue(BlobertLineup, bigintToEntity(blobert_lineup_adress[0]));
    // const moves = useComponentValue(Moves, entityId);

    const handleRestoreBurners = async () => {
        try {
            await applyFromClipboard();
            setClipboardStatus({
                message: "Burners restored successfully!",
                isError: false,
            });
        } catch (error) {
            setClipboardStatus({
                message: `Failed to restore burners from clipboard`,
                isError: true,
            });
        }
    };

    useEffect(() => {
        if (clipboardStatus.message) {
            const timer = setTimeout(() => {
                setClipboardStatus({ message: "", isError: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [clipboardStatus.message]);

    return (
        <>
            <button onClick={create}>
                {isDeploying ? "deploying burner" : "create burner"}
            </button>
            {account && list().length > 0 && (
                <button onClick={async () => await copyToClipboard()}>
                    Save Burners to Clipboard
                </button>
            )}
            <button onClick={handleRestoreBurners}>
                Restore Burners from Clipboard
            </button>
            {clipboardStatus.message && (
                <div className={clipboardStatus.isError ? "error" : "success"}>
                    {clipboardStatus.message}
                </div>
            )}

            <div className="card">
                <div>{`burners deployed: ${count}`}</div>
                <div>
                    select signer:{" "}
                    <select
                        value={account ? account.address : ""}
                        onChange={(e) => select(e.target.value)}
                    >
                        {list().map((account, index) => {
                            return (
                                <option value={account.address} key={index}>
                                    {account.address}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={() => clear()}>
                        Clear burners
                    </button>
                    <p>
                        You will need to Authorise the contracts before you can
                        use a burner. See readme.
                    </p>
                </div>
            </div>

            {/* <div className="card">
                <button onClick={() => spawn(account.account)}>Spawn</button>
                <div>
                    Moves Left: {moves ? `${moves.remaining}` : "Need to Spawn"}
                </div>
                <div>
                    Position:{" "}
                    {position
                        ? `${position.vec.x}, ${position.vec.y}`
                        : "Need to Spawn"}
                </div>
            </div> */}

            <div className="card">
                <div>
                    <button
                        onClick={() =>
                           {
                            console.log(stringToFelt("test"))
                            register_player(account, "test_name")
                           }
                        }
                    >
                        Register
                    </button>
                </div>
                <div>
                    <button
                        onClick={() =>
                           {
                                console.log(name)
                           }
                        }
                    >
                        Check User
                    </button>
                </div>
                <div>
                   <ul>
                    <li>{blobert_1}</li>
                    <li>{blobert_2}</li>
                    <li>{blobert_3}</li>
                    <li>{blobert_4}</li>
                   </ul>
                </div>
                <div>
                    <button
                        onClick={()=>{
                            choose_blobert(account, 1,2,3,4,5,6)
                        }}
                    >
                        Apply Lineup
                    </button>
                </div>
                {/* <div>
                    <button
                        onClick={() =>
                            position && position.vec.x > 0
                                ? move(account.account, Direction.Left)
                                : console.log("Reach the borders of the world.")
                        }
                    >
                        Move Left
                    </button>
                    <button
                        onClick={() => move(account.account, Direction.Right)}
                    >
                        Move Right
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => move(account.account, Direction.Down)}
                    >
                        Move Down
                    </button>
                </div> */}
            </div>
        </>
    );
}

export default App;
