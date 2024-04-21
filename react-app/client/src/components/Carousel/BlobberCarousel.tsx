import { useDojoAccount } from "../../dojo/DojoContext";
import { Carousel } from "flowbite-react";
import { BlobberCard } from "./BlobberCard";
import { useEffect, useState } from "react";

export default function BlobberCarousel() {
  const { account, list } = useDojoAccount();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(list().length - 1);
  }, [list]);

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
        {list().reverse().map((acc, index) => {
          const reversedIndex = list().length - 1 - index;
          return (
            <div className="flex justify-center items-center" key={`blobbercard-${index}`}>
              <BlobberCard
                accountTarget={acc}
                blobbersIndex={reversedIndex}
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
