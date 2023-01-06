import { Avatar } from "./Avatar";
import { StarIcon } from "../icons/StarIcon";
import { Menu } from "./Menu";
import { useUserContext } from "../../context/userContext";

function DashboardMenu() {
  const { userCtx } = useUserContext();

  return (
    <div className="w-60 bg-white p-3 pb-4 border rounded-2xl">
      <div className="flex items-center gap-x-3">
        <Avatar />
        <div className="grow">
          <p className="font-medium leading-none">{`${userCtx.me.firstName} ${userCtx.me.lastName}`}</p>
          <div className="flex items-center">
            <StarIcon role={userCtx.me.role} />
            <p className="text-sm text-slate-500 leading-tight">{userCtx.me.role}</p>
          </div>
        </div>
      </div>
      <hr className="my-3 h-px bg-gray-200 border-0"></hr>
      <Menu.User />
      {userCtx.me.role === "Admin" && <Menu.Admin />}
      {userCtx.me.role === "Teller" && <Menu.Teller />}
    </div>
  );
}

export { DashboardMenu };
