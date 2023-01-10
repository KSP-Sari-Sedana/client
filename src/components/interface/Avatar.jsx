import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";

function Avatar({ dimension, src }) {
  const { userCtx } = useUserContext();

  useEffect(() => {
    userCtx.getMyProfile();
  }, []);

  return (
    <div className={`flex justify-center overflow-hidden items-center ${dimension || "w-12 h-12"} bg-zinc-300 rounded-[21px]`}>
      {src ? (
        <img src={src} alt="Avatar" />
      ) : userCtx.me.image === null || userCtx.me.image === undefined ? (
        <img src="https://source.boringavatars.com/pixel/120?square" alt="Avatar" />
      ) : (
        <img src={userCtx.me.image || src} alt="Avatar" />
      )}
    </div>
  );
}

export { Avatar };
