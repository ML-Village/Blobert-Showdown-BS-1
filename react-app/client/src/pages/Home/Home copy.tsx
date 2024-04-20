import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useDojoSystemCalls, useDojoComponents, useDojoAccount } from "../../dojo/DojoContext";
import { useBlobertLineup } from "../../hooks/useBlobertLineup";
import { usePlayer } from "../../hooks/usePlayer";
import { stringToFelt } from "../../utils";
import { blobbersPath } from "../../utils/blobbers";
import { ChooseBlobertModel } from "../../components/PickBlobert";
import { customBlobertArray, customBlobertInfoObject } from "../../config/constants/customBloberts";
import { CurrentLookingBoard } from "../../components/CurrentLookingBoard";

function Home() {
    const { register_player, choose_blobert, create_room_battle } = useDojoSystemCalls()
    const {Player, BlobertLineup} = useDojoComponents();
    const { account, isMasterAccount, masterAccount, isDeploying, create, clear,copyToClipboard,applyFromClipboard,list,select, get, count } = useDojoAccount()
    const {name, total_duels, total_wins, total_losses} = usePlayer(account.address)
    const {blobert_1, blobert_2, blobert_3, blobert_4, blobert_5, blobert_6} = useBlobertLineup(account.address)

    const [nameSet, setNameSet] = useState<string>(); 

    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });

    const [openModal, setOpenModal] = useState(false);
    const [targetSlot, setTargetSlot] = useState(0);
    const [selectedBlobert, setSelectedBlobert] = useState("notblobby");

    const [slotImagePath, setSlotImagePath] = useState({
        0: {path:"/assets/pc.png", index:0},
        1: {path:"/assets/pc.png", index:0},
        2: {path:"/assets/pc.png", index:0},
        3: {path:"/assets/pc.png", index:0},
        4: {path:"/assets/pc.png", index:0},
        5: {path:"/assets/pc.png", index:0},
    });

  const setBlobertToSlot = (blobert: string, slot: number) => {
    //console.log(`Setting ${blobert} to slot ${slot}`);
    setSlotImagePath({
      ...slotImagePath,
      [slot]: {path: (customBlobertInfoObject as any)[blobert]?.path, index: customBlobertArray.indexOf(blobert)},
    });
  };

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
            <div className="max-w-screen-lg mx-auto p-8 bg-gray-800 text-white rounded-lg">
            <div className="flex flex-col space-y-4">
                {isDeploying ? (
                <div className="flex justify-center items-center">
                    <Spinner size="lg" color="failure" aria-label="Summoning Blobber" />
                </div>
                ) : (
                <button 
                    onClick={create} 
                    disabled={count >= 4} 
                    className={`w-full px-4 py-2 font-semibold rounded-lg transition-colors ${count >= 4 ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-orange-300 hover:bg-orange-400 text-gray-800"}`}
                >
                    {count >= 4 ? "You have enough Blobbers." : "Summon A Blobber"}
                </button>
                )}
        
                <button 
                onClick={clear} 
                className="bg-orange-300 hover:bg-orange-400 text-gray-800 border-2 border-orange-950 font-semibold mx-2 px-4 py-2 rounded-lg transition-colors"
                >
                Kick All Blobbers
                </button>
        
                <div className="text-right font-semibold px-2">
                Summoned Blobbers: {count}/4
                </div>
            </div>
        
            <div className="flex justify-center mt-4">
                {list().reverse().map((a, index) => (
                    <div
                    key={index}
                    className="flex m-2 items-center border-2 rounded-lg overflow-hidden bg-gray-800 border-orange-500"
                    >
                    <img
                        className="object-cover w-28 h-28"
                        src={blobbersPath[index % blobbersPath.length]}
                        alt="Blobber"
                    />
                    <input
                        onChange={(e) => setNameSet(e.target.value)}
                        type="text"
                        placeholder="Name your Blobber"
                        className="flex-1 py-2 px-4 text-lg bg-transparent text-white placeholder-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    </div>
                ))}
            </div>


        
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
                <div className="flex flex-col space-y-4">
                <button
                    onClick={() => {
                    if(!nameSet){ 
                        alert("Input name") 
                        return
                    }
                    console.log(stringToFelt(nameSet));
                    register_player(account, nameSet);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
        
                <button
                    onClick={() => console.log(name)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Check User
                </button>
                <button onClick={()=> setOpenModal(true)}>
                    Choose Blobert
                </button>

                <ChooseBlobertModel openModal={openModal} setOpenModal={setOpenModal} customBlobertArray={customBlobertArray} customBlobertInfoObject={customBlobertInfoObject} selectedBlobert={selectedBlobert} setSelectedBlobert={setSelectedBlobert} setBlobertToSlot={setBlobertToSlot} targetSlot={targetSlot} setTargetSlot={setTargetSlot} slotImagePath={slotImagePath} handleRegisterLineUp={choose_blobert} />
        
                <ul className="list-none p-0 text-[black]">
                    {blobert_1 && <li className="py-1">{blobert_1}</li>}
                    {blobert_2 && <li className="py-1">{blobert_2}</li>}
                    {blobert_3 && <li className="py-1">{blobert_3}</li>}
                    {blobert_4 && <li className="py-1">{blobert_4}</li>}
                    {blobert_5 && <li className="py-1">{blobert_5}</li>}
                    {blobert_6 && <li className="py-1">{blobert_6}</li>}
                </ul>
        
                <button
                    onClick={() => choose_blobert(account, 1, 2, 3, 4, 5, 6)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Apply Lineup
                </button>
                </div>
            </div>
            <div>
                <button onClick={()=> {
                    try {
                        create_room_battle(account);
                        alert("ROOM IS MADE")
                    }catch(e){
                        alert("ROOM FAILED")
                    }
                }}>
                    Create Room
                </button>
            </div>
            <CurrentLookingBoard />
            </div>
        </>
    );
}

export default Home;
