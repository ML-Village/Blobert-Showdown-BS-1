import { CustomFlowbiteTheme, Modal, Progress } from "flowbite-react";
import { AccountInterface } from "starknet";

const customModalTheme: CustomFlowbiteTheme["modal"] = {
    root: {
      base: "fixed inset-x-0 top-0 z-40 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      show: {
        on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        off: "hidden",
      },
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner:
        "bg-orange-200/95 relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
    },
    body: {
      base: "flex-1 overflow-auto p-6",
      popup: "pt-0",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
  };

  export interface BlobertInfo {
    path: string;
  }
  // Assuming the slot numbers are 0 through 5, if there are more slots, you can add them similarly
  
  
  interface ChooseBlobertModelProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    customBlobertArray: string[]; // Assuming this is an array of blobert identifiers (like names or IDs)
    customBlobertInfoObject: Record<string, BlobertInfo>;
    selectedBlobert: string; // The identifier for the currently selected blobert
    setSelectedBlobert: (blobert: string) => void;
    setBlobertToSlot: (blobert: string, slot: number) => void;
    targetSlot: number;
    setTargetSlot: (slot: number) => void;
    slotImagePath: SlotImagePath; // Assuming this is an array with BlobertInfo for each slot
    handleRegisterLineUp: (signer: AccountInterface, blobert_1: number, blobert_2: number, blobert_3: number, blobert_4: number, blobert_5: number, blobert_6: number) => void;
  }

  export const ChooseBlobertModel: React.FC<ChooseBlobertModelProps> = ({
    openModal,
    setOpenModal,
    customBlobertArray,
    customBlobertInfoObject,
    selectedBlobert,
    setSelectedBlobert,
    setBlobertToSlot,
    targetSlot,
    setTargetSlot,
    slotImagePath,
    handleRegisterLineUp
}) => {
    return (
        <Modal
        theme={customModalTheme}
        dismissible
        show={openModal}
        position="top-center"
        size="7xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header>
          <div className="mx-2 px-4 py-2">Choose Your Blobbery Blob Blob</div>
        </Modal.Header>

        <Modal.Body>
          <div className="flex flex-col">
            <div className="flex ">
              {/* blob list panel */}
              <div
                className="border-2 border-orange-950 rounded-xl
                      grid grid-cols-8
                      w-2/3 overflow-auto
                      "
              >
                {customBlobertArray.map((blobert, index) => {
                  return (
                    <div
                      className="flex flex-col items-center justify-center
                            mx-2 my-2
                            "
                      key={`blobber-card-${index}`}
                    >
                      <img
                        className={`h-20 rounded-lg
                                cursor-pointer
                              ${selectedBlobert == blobert ? `border-8 border-orange-700` : `border`}
                              hover:border-4 hover:border-yellow-400
                              
                              `}
                        src={customBlobertInfoObject[blobert]?.path}
                        onClick={() => {
                          setSelectedBlobert(blobert);
                          setBlobertToSlot(blobert, targetSlot);
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* feature panel */}
              <div
                className="flex-grow mx-2 
                      flex flex-col items-center
                      border-2 border-gray-800 rounded-xl"
              >
                {/* Blobert Name */}
                <div className="my-4 text-2xl font-semibold text-gray-800">
                  {selectedBlobert.toUpperCase()}
                </div>

                {/* Blobert Image */}
                <div className="my-2">
                  <img
                    className="h-28 rounded-lg border-2 border-gray-800"
                    src={customBlobertInfoObject[selectedBlobert]?.path}
                  />
                </div>

                {/* Stats */}
                <div
                  className="my-2 flex flex-col items-center justify-center w-full 
                        text-xs text-orange-900"
                >
                  {/* HP */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">HP</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(255 / 255) * 100} color="lime" />
                    </span>
                    <span className="w-10 ml-1">255</span>
                  </div>

                  {/* ATK */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">Attack</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(180 / 255) * 100} color="yellow" />
                    </span>
                    <span className="w-10 ml-1">180</span>
                  </div>

                  {/* DEF */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">Defense</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(160 / 255) * 100} color="teal" />
                    </span>
                    <span className="w-10 ml-1">255</span>
                  </div>

                  {/* SPC ATk */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">Spc Atk</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(160 / 255) * 100} color="pink" />
                    </span>
                    <span className="w-10 ml-1">255</span>
                  </div>

                  {/* SPC Def */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">Spc Def</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(160 / 255) * 100} color="blue" />
                    </span>
                    <span className="w-10 ml-1">255</span>
                  </div>

                  {/* SPE */}
                  <div className="w-full flex items-center pl-6">
                    <span className="mx-4 w-12">Speed</span>
                    <span className="flex-grow h-full pt-1">
                      <Progress progress={(160 / 255) * 100} color="purple" />
                    </span>
                    <span className="w-10 ml-1">255</span>
                  </div>
                </div>

                {/* Move Box */}
                <div
                  className="w-full items-center justify-center
                        p-2 px-8
                        grid grid-cols-2 grid-rows-2 gap-1
                        "
                >
                  {/* 4 move buttons using array */}
                  {Array(4)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <div
                          className="bg-orange-700/60 border-2 border-gray-800
                                rounded-lg text-white font-semibold px-4 py-2
                                flex justify-center items-center cursor-pointer
                                "
                          key={`move-${index}`}
                        >
                          Move {index + 1}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* lineup box */}
            <div className="flex flex-col justify-center items-center w-full">
              <span className="w-full px-4 py-2 text-2xl font-semibold">
                Select a slot then pick a Blobert for that slot.
              </span>
              {/* Container for Lineup */}
              <div className="flex mb-2 mx-2 items-center justify-between">
                <div className="flex grid-cols-6 gap-1 justify-between w-full mx-1 px-1">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <img
                          className={`${targetSlot == index ? `border-4 border-orange-700` : `border`} 
                                  h-20 rounded-lg cursor-pointer`}
                          src={slotImagePath[index].path}
                          onClick={() => {
                            setTargetSlot(index);
                          }}
                          key={`slot-${index}`}
                        />
                      );
                    })}
                </div>

                {/* configure lineup */}
                <button
                  className="
                          ml-auto shrink
                            px-2 py-2 border rounded-lg 
                            text-white text-wrap text-sm font-semibold
                            bg-red-700 hover:bg-red-300 hover:text-orange-900 
                            hover:border-orange-900 hover:border-2
                            "
                  onClick={handleRegisterLineUp}
                >
                  Confirm LineUp
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* 
            <Modal.Footer>
              
            </Modal.Footer> */}
      </Modal>
    )
}