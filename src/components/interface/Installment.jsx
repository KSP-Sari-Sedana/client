import { createPortal } from "react-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Installment({ isOpen, closeModal, installment }) {
  return createPortal(
    <div className="relative top-0 z-40">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-10" />
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
                  <Dialog.Title as="h3" className="font-medium">
                    Angsuran
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">Angsuran yang harus dibayarkan</p>
                  <div className="mt-3 border border-slate-200 rounded-xl">
                    <dl className="rounded-lg">
                      <div className="bg-clear-50 px-4 py-4 grid grid-cols-4 rounded-t-xl">
                        <dt className="text-sm">Bulan</dt>
                        <dt className="text-sm">Pokok</dt>
                        <dt className="text-sm">Bulan</dt>
                        <dt className="text-sm">Sisa</dt>
                      </div>
                      {installment?.map((item, index) => {
                        return (
                          <div className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${installment.length === index + 1 && "rounded-b-2xl"} px-4 py-3 grid grid-cols-4`}>
                            <dt className="text-sm text-gray-500">{index + 1}</dt>
                            <dt className="text-sm text-gray-500">{item.principal}</dt>
                            <dt className="text-sm text-gray-500">{item.interest}</dt>
                            <dt className="text-sm text-gray-500">{item.loanBalance}</dt>
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
