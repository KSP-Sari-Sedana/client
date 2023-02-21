import { createPortal } from "react-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Installment({ isOpen, closeModal, installment }) {
  return createPortal(
    <div className="relative top-0 z-40">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-600 bg-opacity-10" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl max-h-96 overflow-scroll transform rounded-2xl bg-white p-6 text-left align-middle transition-all">
                  <div className="px-3">
                    <Dialog.Title className="font-medium text-sm">Daftar Angsuran</Dialog.Title>
                    <p className="text-sm text-gray-500">Angsuran yang harus dibayarkan</p>
                  </div>
                  <div className="mt-3 border border-slate-200 rounded-xl">
                    <dl className="rounded-lg">
                      <div className="bg-white px-4 py-4 grid grid-cols-9 rounded-t-xl text-sm border-b">
                        <dt>Bulan</dt>
                        <dt className="col-span-2">Pokok</dt>
                        <dt className="col-span-2">Bunga</dt>
                        <dt className="col-span-2">Total</dt>
                        <dt className="col-span-2">Sisa</dt>
                      </div>
                      {installment?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${installment.length === index + 1 && "rounded-b-2xl"} px-4 py-3 grid grid-cols-9 text-sm text-zinc-600`}
                          >
                            <dt>{index + 1}</dt>
                            <dt className="col-span-2">Rp. {item?.principal?.toLocaleString("Id-id")}</dt>
                            <dt className="col-span-2">Rp. {item?.interest?.toLocaleString("Id-id")}</dt>
                            <dt className="col-span-2">Rp. {item?.total?.toLocaleString("Id-id")}</dt>
                            <dt className="col-span-2">Rp. {item?.loanBalance?.toLocaleString("Id-id")}</dt>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>,
    document.getElementById("installment")
  );
}

export { Installment };
