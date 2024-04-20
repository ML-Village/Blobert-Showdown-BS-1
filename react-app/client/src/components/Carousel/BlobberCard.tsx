import { Burner } from "@dojoengine/create-burner";
import { publicBlobbersPath } from "../../config/constants/blobbers";

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

      {/* name input box */}
    </div>
  );
};
