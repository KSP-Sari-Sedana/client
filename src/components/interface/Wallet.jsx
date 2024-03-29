import { ChipIcon } from "../icons/ChipIcon";
import { SwellArt } from "../art/SwellArt";
import { useUserContext } from "../../context/userContext";

function Rainbow() {
  const { userCtx } = useUserContext();

  return (
    <div className="w-80 h-52 rounded-2xl border flex bg-white overflow-hidden relative">
      <div className="absolute left-56 bottom-4">
        <SwellArt />
      </div>
      <div className="absolute h-full p-5">
        <div className="flex flex-col justify-between h-full">
          <div className="grow">
            <ChipIcon />
          </div>
          <div className="mb-2 font-darkergrotesque text-2xl font-extrabold">
            <div className="flex gap-x-2">
              <p>{userCtx.me.firstName}</p>
            </div>
            <div className="flex gap-x-2">
              <p>{userCtx.me.lastName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Wallet = {
  Rainbow,
};

export { Wallet };
