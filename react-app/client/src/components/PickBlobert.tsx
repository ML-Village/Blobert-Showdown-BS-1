import { CustomFlowbiteTheme, Modal, Progress } from "flowbite-react";
import { useState } from "react";
import { publicBlobertsPath } from "../config/constants/customBloberts";
import { useDojoAccount, useDojoSystemCalls } from "../dojo/DojoContext";

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

interface ChooseBlobertModelProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const ChooseBlobertModel: React.FC<ChooseBlobertModelProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [selectedBlobert, setSelectedBlobert] = useState("");
  const [selectedBlobertIndex, setSelectedBlobertIndex] = useState(-1);

  // State variables to keep track of the selected Blobert for each image button
  const [selectedBlobert1, setSelectedBlobert1] = useState(-1);
  const [selectedBlobert2, setSelectedBlobert2] = useState(-1);
  const [selectedBlobert3, setSelectedBlobert3] = useState(-1);
  const [selectedBlobert4, setSelectedBlobert4] = useState(-1);
  const [selectedBlobert5, setSelectedBlobert5] = useState(-1);
  const [selectedBlobert6, setSelectedBlobert6] = useState(-1);

  const { choose_blobert } = useDojoSystemCalls();
  const { account } = useDojoAccount()

  const handleRegisterLineUp = () => {

    alert(`Selected Blobert Indexes: ${selectedBlobert1}, ${selectedBlobert2}, ${selectedBlobert3}, ${selectedBlobert4}, ${selectedBlobert5}, ${selectedBlobert6}`);
    // choose_blobert(account, selectedBlobert1, selectedBlobert2, selectedBlobert3, selectedBlobert4, selectedBlobert5, selectedBlobert6);
  };

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
          <div className="flex">
            <div className="border-2 border-orange-950 rounded-xl grid grid-cols-8 w-2/3 overflow-auto">
              {publicBlobertsPath.map((path, index) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center mx-2 my-2"
                    key={`blobber-card-${index}`}
                  >
                    <img
                      className={`h-20 rounded-lg cursor-pointer ${
                        selectedBlobertIndex === index
                          ? "border-8 border-orange-700"
                          : "border"
                      } hover:border-4 hover:border-yellow-400`}
                      src={path}
                      onClick={() => {
                        setSelectedBlobert(path);
                        setSelectedBlobertIndex(index);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex-grow mx-2 flex flex-col items-center border-2 border-gray-800 rounded-xl">
              <div className="my-4 text-2xl font-semibold text-gray-800">
                {selectedBlobert.toUpperCase()}
              </div>

              <div className="my-2">
                <img
                  className="h-28 rounded-lg border-2 border-gray-800"
                  src={selectedBlobert}
                />
              </div>

              <div className="my-2 flex flex-col items-center justify-center w-full text-xs text-orange-900">
                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">HP</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(255 / 255) * 100} color="lime" />
                  </span>
                  <span className="w-10 ml-1">255</span>
                </div>

                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">Attack</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(180 / 255) * 100} color="yellow" />
                  </span>
                  <span className="w-10 ml-1">180</span>
                </div>

                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">Defense</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(160 / 255) * 100} color="teal" />
                  </span>
                  <span className="w-10 ml-1">255</span>
                </div>

                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">Spc Atk</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(160 / 255) * 100} color="pink" />
                  </span>
                  <span className="w-10 ml-1">255</span>
                </div>

                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">Spc Def</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(160 / 255) * 100} color="blue" />
                  </span>
                  <span className="w-10 ml-1">255</span>
                </div>

                <div className="w-full flex items-center pl-6">
                  <span className="mx-4 w-12">Speed</span>
                  <span className="flex-grow h-full pt-1">
                    <Progress progress={(160 / 255) * 100} color="purple" />
                  </span>
                  <span className="w-10 ml-1">255</span>
                </div>
              </div>

              <div className="w-full items-center justify-center p-2 px-8 grid grid-cols-2 grid-rows-2 gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div
                        className="bg-orange-700/60 border-2 border-gray-800 rounded-lg text-white font-semibold px-4 py-2 flex justify-center items-center cursor-pointer"
                        key={`move-${index}`}
                      >
                        Move {index + 1}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full">
            <h1 className=" px-4 py-2 text-2xl font-semibold">
              Select a Blobert
            </h1>

            <div className="flex justify-center items-center gap-10">
              <div className="flex gap-4">
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert1(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert1 !== -1
                        ? publicBlobertsPath[selectedBlobert1]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert2(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert2 !== -1
                        ? publicBlobertsPath[selectedBlobert2]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert3(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert3 !== -1
                        ? publicBlobertsPath[selectedBlobert3]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert4(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert4 !== -1
                        ? publicBlobertsPath[selectedBlobert4]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert5(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert5 !== -1
                        ? publicBlobertsPath[selectedBlobert5]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
                <button
                  className="border-2 rounded-xl border-black"
                  onClick={() => setSelectedBlobert6(selectedBlobertIndex)}
                >
                  <img
                    className="h-20 rounded-xl"
                    src={
                      selectedBlobert6 !== -1
                        ? publicBlobertsPath[selectedBlobert6]
                        : "/pc.png"
                    }
                    alt=""
                  />
                </button>
              </div>

              <button
                className=" h-14 shrink px-2 py-2 border rounded-lg text-white text-wrap text-sm font-semibold bg-red-700 hover:bg-red-300 hover:text-orange-900 hover:border-orange-900 hover:border-2"
                onClick={handleRegisterLineUp}
              >
                Confirm <br />
                Lineup
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
