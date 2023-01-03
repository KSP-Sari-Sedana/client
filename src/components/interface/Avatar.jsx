import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";

function Avatar() {
  const { userCtx } = useUserContext();

  useEffect(() => {
    userCtx.getMyProfile();
  }, []);

  return (
    <div className={`flex justify-center overflow-hidden items-center w-12 h-12 bg-zinc-300 rounded-[21px]`}>
      {userCtx.me.image === null || userCtx.me.image === undefined ? <img src="https://source.boringavatars.com/pixel/120?square" alt="Avatar" /> : <img src={userCtx.me.image} alt="Avatar" />}
    </div>
  );
}

export { Avatar };
