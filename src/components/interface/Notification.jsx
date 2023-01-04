import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Announcement } from "./Announcement";
import { TollerIcon } from "../icons/TollerIcon";

function Notification() {
  return (
    <Fragment>
      <Popover>
        <Popover.Button className="flex focus:outline-none">
          <TollerIcon />
          <div className="absolute h-3 w-3 bg-bethlehem-700 top-[30px] ml-2 rounded-full border-2 border-white"></div>
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
                <Announcement category="Transaksi" detail="Transaksi sebesar Rp.300.000 dilakukan pada produk SIPURA" isRead={true} date="12 Desember 2022" />
                <Announcement category="Pengajuan" detail="Selamat pengajuan produk SIPURA anda diterima" isRead={false} date="12 Desember 2022" />
                <Announcement category="Akun" detail="Selamat datang, lengkapi profil untuk memulai menikmati produk" isRead={false} date="12 Desember 2022" />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  );
}

export { Notification };
