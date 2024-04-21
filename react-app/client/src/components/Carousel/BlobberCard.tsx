import { Burner } from "@dojoengine/create-burner";
import { publicBlobbersPath } from "../../config/constants/blobbers";
import {
  useDojoAccount,
  useDojoComponents,
  useDojoSystemCalls,
} from "../../dojo/DojoContext";
import { usePlayer } from "../../hooks/usePlayer";
import { useEffect, useRef, useState } from "react";
import { stringToFelt } from "../../utils";
import { ChooseBlobertModel } from "../PickBlobert";
import {
  customBlobertArray,
  customBlobertInfoObject,
  publicBlobertsPath,
} from "../../config/constants/customBloberts";
import { useBlobertLineup } from "../../hooks/useBlobertLineup";

export const BlobberCard = ({
  accountTarget,
  blobbersIndex,
  burnerAddress,
  selected,
}: {
  accountTarget: Burner;
  blobbersIndex: number;
  burnerAddress: string;
  selected: boolean;
}) => {
  const { account, select } = useDojoAccount();
  const { name, total_duels, total_wins, total_losses } =
    usePlayer(burnerAddress);
  const { register_player, choose_blobert, create_room_battle } =
    useDojoSystemCalls();

  const handleRegisterName = () => {
    if (!nameInputValue) {
      alert("Input name");
      return;
    }

    console.log(stringToFelt(nameInputValue));
    register_player(account, nameInputValue);
    setNameInputValue(""); // Clear the input field
  };

  // input config
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [nameInputValue, setNameInputValue] = useState("");
  const handleNameInputChange = (e: any) => {
    setNameInputValue(e.target.value);
  };

  // blobert image config
  const { blobert_1, blobert_2, blobert_3, blobert_4, blobert_5, blobert_6 } =
    useBlobertLineup(burnerAddress);

  // useEffect(() => {
  //   console.log(
  //     "BLOBERT LINE UP",
  //     blobert_1,
  //     blobert_2,
  //     blobert_3,
  //     blobert_4,
  //     blobert_5,
  //     blobert_6
  //   );
  // });

  // modal config
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlobert, setSelectedBlobert] = useState("notblobby");
  const [targetSlot, setTargetSlot] = useState(0);

  const [slotImagePath, setSlotImagePath] = useState({
    0: { path: "/pc.png", index: 0 },
    1: { path: "/pc.png", index: 0 },
    2: { path: "/pc.png", index: 0 },
    3: { path: "/pc.png", index: 0 },
    4: { path: "/pc.png", index: 0 },
    5: { path: "/pc.png", index: 0 },
  });

  const setBlobertToSlot = (blobert: string, slot: number) => {
    //console.log(`Setting ${blobert} to slot ${slot}`);
    setSlotImagePath({
      ...slotImagePath,
      [slot]: {
        path: (customBlobertInfoObject as any)[blobert]?.path,
        index: customBlobertArray.indexOf(blobert),
      },
    });
  };

  return (
    <div
      className={`${selected ? "border-2 border-yellow-400" : "border border-white"}
        rounded-lg p-4 bg-orange-200/30 w-[880px] flex items-center`}
    >
      {/* profile image */}
      <div
        className={`${selected ? `border-orange-500` : `border-white`}
            mx-2 h-28 w-28 border rounded-lg flex items-center justify-center`}
      >
        <img
          className="w-full"
          src={publicBlobbersPath[blobbersIndex % publicBlobbersPath.length]}
          alt="..."
        />
      </div>

      {/* data section */}
      <div className="flex flex-col w-full">
        {/* input name and register button */}
        <div className="flex mt-2 mx-2">
          <label className="mr-2 flex justify-center items-center text-white">
            Blobber Name
          </label>

          <input
            className="flex-grow rounded-lg mx-2 text-gray-800 bg-slate-300
           focus:no-outline focus:ring-2 focus:ring-offset-transparent 
           focus:border-yellow-500 focus:ring-yellow-500
            "
            type="text"
            placeholder={name || "Enter Blobber name"}
            maxLength={20}
            value={nameInputValue}
            onChange={handleNameInputChange}
            ref={nameInputRef}
            onClick={() => nameInputRef.current?.focus()}
            disabled={name !== ""}
          />
          <button
            className={`border border-white rounded-lg px-2 text-white 
              ${
                name === ""
                  ? `bg-orange-800 hover:bg-orange-600`
                  : `bg-gray-800`
              }
              `}
            onClick={handleRegisterName}
            disabled={name !== ""}
          >
            {name === "" ? `Register Name` : `Blobber Registered`}
          </button>
        </div>

        {/* signer address and select blobber button */}
        <div
          className="mx-2 my-2 flex items-center text-sm text-white
            "
        >
          <span>signer: {burnerAddress}</span>
          <button
            className={`ml-auto p-2 rounded-md
              ${
                selected
                  ? `bg-yellow-300/35 border-2 border-orange-500`
                  : `border-2 border-green-900 bg-emerald-500 text-black font-semibold hover:bg-green-800 hover:text-white`
              }
              `}
            disabled={selected}
            onClick={() => select(burnerAddress)}
          >
            {selected ? `Blobber Selected` : `Use This Blobber`}
          </button>
        </div>

        {/* configure blobert lineup */}
        <div className=" flex items-center justify-center">
          <div className="flex grid-cols-6 gap-1 justify-between w-full mx-1 px-1">
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_1) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_1) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_2) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_2) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_3) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_3) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_4) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_4) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_5) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_5) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                Number(blobert_6) === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(blobert_6) - 1) % publicBlobertsPath.length
                    ]
              }
            />
          </div>

          <button
            className="bg-orange-300 shrink px-2 py-2 border rounded-lg text-wrap text-sm"
            onClick={() => setOpenModal(true)}
          >
            configure Blobert Line-up
          </button>
          <ChooseBlobertModel
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
    </div>
  );
};
