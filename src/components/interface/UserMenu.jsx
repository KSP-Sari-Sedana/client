import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Avatar } from "./Avatar";
import { StarIcon } from "../icons/StarIcon";
import { useAuthContext } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";

function UserMenu() {
  const { authCtx } = useAuthContext();
  const { userContexts } = useUserContext();
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
              <div className="flex items-center gap-x-3">
                <Avatar />
                <div className="grow">
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
                  <span className="ml-2 text-sm">Dashboard</span>
                </div>
              </Link>
              <Link to="/profile">
                <div className="inline-flex items-center cursor-pointer w-full hover:bg-electron-500 hover:text-white p-2 rounded-md">
                  <span className="ml-2 text-sm">Profil</span>
                </div>
              </Link>
              <div
                className="inline-flex items-center cursor-pointer w-full hover:bg-bethlehem-600 hover:text-white p-2 rounded-md"
                onClick={() => {
                  authCtx.logout();
                }}
              >
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
