import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Avatar } from "./Avatar";
import { StarIcon } from "../icons/StarIcon";
import { DashboardIcon } from "../icons/DashboardIcon";
import { ProfileCircleIcon } from "../icons/ProfileCircleIcon";
import { DoorIcon } from "../icons/DoorIcon";
import { useAuthContext } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";

function UserMenu() {
  const { authContexts } = useAuthContext();
  const { userContexts } = useUserContext();

  const { logout } = authContexts;
  const { me } = userContexts;

  return (
    <Fragment>
      <Popover>
        <Popover.Button className="flex focus:outline-none">
          <Avatar />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel>
            <div className="w-60 rounded-2xl bg-white border border-slate-200 shadow-sm px-3 py-3 absolute top-[8px] -right-5">
              <div className="flex items-center">
                <Avatar />
                <div className="ml-3 grow">
                  <p className="font-medium leading-none">{`${me.firstName} ${me.lastName}`}</p>
                  <div className="flex items-center">
                    <StarIcon role={me.role} />
                    <p className="text-sm text-slate-500 leading-tight">{me.role}</p>
                  </div>
                </div>
              </div>
              <hr className="my-3 h-px bg-gray-200 border-0"></hr>
              <Link to="/dashboard">
                <div className="inline-flex items-center cursor-pointer w-full hover:bg-electron-500 hover:text-white p-2 rounded-md">
                  <DashboardIcon />
                  <span className="ml-2 text-sm">Dashboard</span>
                </div>
              </Link>
              <Link to="/profile">
                <div className="inline-flex items-center cursor-pointer w-full hover:bg-electron-500 hover:text-white p-2 rounded-md">
                  <ProfileCircleIcon />
                  <span className="ml-2 text-sm">Profil</span>
                </div>
              </Link>
              <div
                className="inline-flex items-center cursor-pointer w-full hover:bg-bethlehem-600 hover:text-white p-2 rounded-md"
                onClick={() => {
                  logout();
                }}
              >
                <DoorIcon />
                <span className="ml-2 text-sm">Keluar</span>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  );
}

export { UserMenu };
