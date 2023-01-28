import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Announcement } from "./Announcement";
import { Spinner } from "./Spinner";
import { TollerIcon } from "../icons/TollerIcon";
import { useNotifContext } from "../../context/notifContext";

function Notification() {
  const [notifs, setNotifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notifCtx } = useNotifContext();

  useEffect(() => {
    getNotif();
  }, []);

  async function getNotif() {
    setNotifs(await notifCtx.getByUser());
    setNotifs(await notifCtx.getByUser());
    setIsLoading(false);
  }

  const unreadNotif = notifs.filter((notif) => !notif.isRead);

  return (
    <Fragment>
      <Popover>
        <Popover.Button className="flex focus:outline-none relative">
          <TollerIcon />
          {unreadNotif.length > 0 && (
            <div className="absolute flex top-1">
              <div className="absolute h-3 w-3 bg-bethlehem-700 ml-2 rounded-full border-2 border-white"></div>
              <div className="absolute h-3 w-3 bg-bethlehem-700 ml-2 rounded-full border-2 border-white animate-ping"></div>
            </div>
          )}
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
            <div className="w-[410px] h-[410px] overflow-scroll rounded-2xl bg-white border border-slate-200 shadow-sm px-3 py-3 absolute top-[8px] -right-5">
              <p className="text-sm text-center">Notifikasi terakhir</p>
              {isLoading ? (
                <Spinner text="Loading" className="text-slate-700 place-content-center mt-3" />
              ) : (
                <div>
                  {notifs.map((notif, index) => {
                    return (
                      <Announcement
                        action={() => {
                          getNotif();
                        }}
                        key={index}
                        id={notif.id}
                        category={notif.category}
                        detail={notif.detail}
                        isRead={notif.isRead}
                        date={notif.date}
                        link={notif.link}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  );
}

export { Notification };
