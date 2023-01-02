import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";

function Avatar() {
  const { userContexts } = useUserContext();
  const { me, getMyProfile } = userContexts;

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className={`flex justify-center overflow-hidden items-center w-12 h-12 bg-zinc-300 rounded-[21px]`}>
      {me.image === null || me.image === undefined ? <img src="https://source.boringavatars.com/pixel/120?square" alt="Avatar" /> : <img src={me.image} alt="Avatar" />}
    </div>
  );
}

export { Avatar };
