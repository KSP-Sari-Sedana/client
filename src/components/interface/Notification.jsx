import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Announcement } from "./Announcement";
import { TollerIcon } from "../icons/TollerIcon";
import { useNotifContext } from "../../context/notifContext";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { notifCtx } = useNotifContext();

  async function getNotification() {
    setNotifications(await notifCtx.getByUser());
  }

  useEffect(() => {
    getNotification();
  }, []);

  const unreadNotif = notifications.filter((notif) => !notif.isRead);

  return (
    <Fragment>
      <Popover>
        <Popover.Button className="flex focus:outline-none relative">
          <TollerIcon />
          {unreadNotif.length > 0 && (
            <div className="absolute flex top-1">
              <div className="absolute h-3 w-3 bg-bethlehem-700 ml-2 rounded-full border-2 border-white"></div>
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
            <div className="w-96 h-96 overflow-auto rounded-2xl bg-white border border-slate-200 shadow-sm px-3 py-3 absolute top-[8px] -right-5">
              <p className="text-sm text-center">Notifikasi terakhir</p>
              <div>
                {notifications.map((notif, index) => {
                  return <Announcement key={index} category={notif.category} detail={notif.detail} isRead={notif.isRead} date={notif.date} link={notif.link} />;
                })}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  );
}

export { Notification };
