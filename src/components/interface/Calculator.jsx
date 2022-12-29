import { Fragment, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";

import { Input } from "./Input";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { CheckMarkIcon } from "../icons/CheckMarkIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import { useProductContext } from "../../context/productContext";

function Calculator(props) {
  const { product, id } = props;

  const { productContexts } = useProductContext();
  const { tenor, installment, loanFund, interestType, calculate, setTenor, setLoanFund, setInterestType, setInstallment, calculation } = productContexts;

  useEffect(() => {
    calculate(id, { tenor, installment, loanFund, interestType });
  }, [tenor, installment, loanFund, interestType]);

  return (
    <Fragment>
      <div className="shadow-sm border border-gray-200 rounded-2xl">
        <div className="px-6 py-3 bg-clear-50 rounded-t-2xl border-b border-gray-200">
          <p className="font-medium">
            Pengajuan Produk <span className="font-sourcecodepro font-bold">{product.name}</span>
          </p>
          <p className="-mt-1 text-sm text-gray-500">@ {new Date().toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
        </div>
        <div className="bg-white rounded-2xl">
          <div className="px-6 py-4 mb-2">
            <div className="flex gap-x-10">
              <div>
                <p className="mb-2 text-sm">Tenor</p>
                <div className="flex items-center">
                  <RadioGroup value={tenor} onChange={setTenor}>
                    <div className="grid grid-cols-4 gap-2">
                      {product?.tenor?.map((value, index) => {
                        return (
                          <RadioGroup.Option key={index} value={value} className="bg-zinc-50 rounded overflow-hidden">
                            {({ checked }) => (
                              <div className={`${checked && "bg-clear-50 text-clear-500"} rounded cursor-pointer text-sm px-2 py-1 flex items-center`}>
                                <CheckMarkIcon isChecked={checked} />
                                <span>{value}</span>
                              </div>
                            )}
                          </RadioGroup.Option>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grow">
                <div className="mb-2 text-sm">{product.type === "Simpanan" && "Angsuran"}</div>
                <div className="flex gap-x-3">
                  {product.type === "Pinjaman" && (
                    <div className="w-52">
                      <Input value={loanFund} action={setLoanFund} icon="currency" label="Dana Pinjaman" type="text" placeHolder="10.000.000" />
                    </div>
                  )}
                  {product.type === "Pinjaman" && (
                    <div>
                      <p className="mb-2 text-sm">Jenis Bunga</p>
                      <RadioGroup value={interestType} onChange={setInterestType}>
                        <div className="flex flex-col gap-y-2">
                          <RadioGroup.Option value="Menurun" className="bg-zinc-50 rounded overflow-hidden">
                            {({ checked }) => (
                              <div className={`${checked && "bg-clear-50 text-clear-500"} rounded cursor-pointer text-sm px-2 py-1 flex items-center`}>
                                <CheckMarkIcon isChecked={checked} />
                                <span>Menurun</span>
                              </div>
                            )}
                          </RadioGroup.Option>
                          <RadioGroup.Option value="Tetap" className="bg-zinc-50 rounded overflow-hidden">
                            {({ checked }) => (
                              <div className={`${checked && "bg-clear-50 text-clear-500"} rounded cursor-pointer text-sm px-2 py-1 flex items-center`}>
                                <CheckMarkIcon isChecked={checked} />
                                <span>Tetap</span>
                              </div>
                            )}
                          </RadioGroup.Option>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <RadioGroup value={installment} onChange={setInstallment}>
                    <div className="grid grid-cols-3 gap-2">
                      {product?.installment?.map((value, index) => {
                        return (
                          <RadioGroup.Option key={index} value={value} className="bg-zinc-50 rounded overflow-hidden">
                            {({ checked }) => (
                              <div className={`${checked && "bg-clear-50 text-clear-500"} rounded cursor-pointer text-sm px-2 py-1 flex items-center`}>
                                <CheckMarkIcon isChecked={checked} />
                                <span>{value.toLocaleString("ID-id")}</span>
                              </div>
                            )}
                          </RadioGroup.Option>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <hr className="my-3 h-px bg-gray-200 border-0"></hr>
            {product.type === "Simpanan" && (
              <div className="grid grid-cols-3 mt-5">
                <div>
                  <p className="text-sm mb-1">Total</p>
                  <Badge style="rice" content={`Rp. ${calculation?.total?.toLocaleString("ID-id") || 0}`} />
                </div>
                <div>
                  <p className="text-sm mb-1">Bunga</p>
                  <Badge style="rice" content={`Rp. ${calculation?.interest?.toLocaleString("ID-id") || 0}`} />
                </div>
                <div>
                  <p className="text-sm mb-1">Profit</p>
                  <Badge style="rice" content={`Rp. ${calculation?.profit?.toLocaleString("ID-id") || 0}`} />
                </div>
              </div>
            )}
            {product.type === "Pinjaman" && (
              <div>
                <div className="grid grid-cols-4 mt-2 gap-3">
                  <div>
                    <p className="text-sm mb-1">Administrasi</p>
                    <Badge style="pippin" content={`Rp. ${calculation?.terms?.administrative?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Notaris</p>
                    <Badge style="pippin" content={`Rp. ${calculation?.terms?.notary?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Pemeriksaan</p>
                    <Badge style="pippin" content={`Rp. ${calculation?.terms?.checkingFee?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Materai</p>
                    <Badge style="pippin" content={`Rp. ${calculation?.terms?.stampDuty?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Asuransi</p>
                    <Badge style="rice" content={`Rp. ${calculation?.terms?.insurance?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Provisi</p>
                    <Badge style="rice" content={`Rp. ${calculation?.terms?.provision?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Simpanan Wajib</p>
                    <Badge style="rice" content={`Rp. ${calculation?.terms?.provision?.toLocaleString("ID-id") || 0}`} />
                  </div>
                </div>
                <div className="grid grid-cols-4 mt-8 gap-3">
                  <div>
                    <p className="text-sm mb-1">Potongan</p>
                    <Badge style="magenta" content={`Rp. ${calculation?.deductionAmount?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Uang Diterima</p>
                    <Badge style="rice" content={`Rp. ${calculation?.receivedAmount?.toLocaleString("ID-id") || 0}`} />
                  </div>
                  <div className="flex items-center">
                    <button onClick={props.installment} className="flex items-center text-sm mb-1 leading-none text-electron-300 hover:text-electron-700">
                      Angsuran
                      <ArrowIcon aim="rightTop" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 w-32">
              <Button text="Ajukan" style="cheerful" round="rounded-md" icon="arrow" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Calculator };
