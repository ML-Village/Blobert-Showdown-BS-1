import { useDojoAccount } from "../../dojo/DojoContext";
import { Carousel } from "flowbite-react";
import { BlobberCard } from "./BlobberCard";

export default function BlobberCarousel() {
  const {
    account,
    isMasterAccount,
    masterAccount,
    isDeploying,
    count,
    create,
    clear,
    copyToClipboard,
    applyFromClipboard,
    list,
    select,
    get,
  } = useDojoAccount();
  return (
    <div
      className="h-[350px] flex flex-col border border-gray-400 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(/library.png)`,
        backgroundSize: "100%",
        backgroundBlendMode: "normal",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white text-center my-2 h-5">
        <span>
          {account && list().length > 0
            ? `Your Current Selected Blobber Address is: ${account.address}`
            : ""}
        </span>
      </div>

      {list().length > 0 ? (
        <Carousel className="px-16" slide={false}>
          {/* Burner Cards */}
          {
            list()
            .reverse()
            .map((acc, index) => {
              return (
                <div
                  className="flex justify-center items-center"
                  key={`blobbercard-${index}`}
                >
                  <BlobberCard
                    accountTarget={acc}
                    blobbersIndex={index}
                    burnerAddress={acc ? acc.address : ""}
                    selected={account.address === acc.address}
                  />
                </div>
              );
            })}
        </Carousel>
      ) : (
        <div className="flex justify-center items-center text-white font-semibold h-full">
          ~ Summon A Blobber to Train your Bloberts ~
        </div>
      )}
    </div>
  );
}
