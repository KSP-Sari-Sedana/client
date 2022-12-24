import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Avatar } from "./Avatar";
import { GoldStarIcon } from "../icons/GoldStarIcon";
import { DashboardIcon } from "../icons/DashboardIcon";
import { ProfileCircleIcon } from "../icons/ProfileCircleIcon";
import { DoorIcon } from "../icons/DoorIcon";
import { useToggleContext } from "../../context/toggleContext";
import { useAuthContext } from "../../context/authContext";

function UserMenu() {
  const { isPopupAvatar, togglePopupAvatar } = useToggleContext();
  const { authContexts } = useAuthContext();

  return (
    <Fragment>
      <Avatar action={togglePopupAvatar} />
      {isPopupAvatar && (
        <div className="w-60 rounded-2xl bg-white border border-slate-200 shadow-sm px-3 py-3 absolute top-[67px] right-0">
          <div className="flex items-center">
            <Avatar />
            <div className="ml-3">
              <p className="font-darkergrotesque font-bold text-2xl leading-none">Suprapta</p>
              <div className="flex items-center">
                <GoldStarIcon />
                <p className="text-sm text-slate-500 leading-tight">Admin</p>
              </div>
            </div>
          </div>
          <hr className="my-3 h-px bg-gray-200 border-0"></hr>
          <Link to="/dashboard">
            <div className="inline-flex items-center cursor-pointer w-full hover:bg-zinc-100 p-2 rounded-md" onClick={togglePopupAvatar}>
              <DashboardIcon />
              <span className="ml-2 text-sm">Dashboard</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="inline-flex items-center cursor-pointer w-full hover:bg-zinc-100 p-2 rounded-md" onClick={togglePopupAvatar}>
              <ProfileCircleIcon />
              <span className="ml-2 text-sm">Profil</span>
            </div>
          </Link>
          <div
            className="inline-flex items-center cursor-pointer w-full hover:bg-zinc-100 p-2 rounded-md"
            onClick={() => {
              togglePopupAvatar();
              authContexts.logout();
            }}
          >
            <DoorIcon />
            <span className="ml-2 text-sm">Keluar</span>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export { UserMenu };
