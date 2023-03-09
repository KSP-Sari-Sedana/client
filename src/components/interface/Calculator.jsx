import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Listbox, Transition } from "@headlessui/react";

import { Input } from "./Input";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Radio, RadioText } from "./Radio";
import { Modal } from "./Modal";
import { ArrowIcon } from "../icons/ArrowIcon";
import { useProductContext } from "../../context/productContext";
import { useSubmContext } from "../../context/submContext";
import { useUserContext } from "../../context/userContext";

const interestAvilable = ["Menurun", "Tetap"];
const collaterals = ["BPKB", "SHM"];

function LoanResult(props) {
  const { calculation } = props;
  return (
    <Fragment>
      <div className="grid grid-cols-4 mt-2 gap-3 text-sm">
        <div>
          <p className="mb-1 font-medium">Administrasi</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.administrative?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Notaris</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.notary?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Pemeriksaan</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.checkingFee?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Materai</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.stampDuty?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Asuransi</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.insurance?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Provisi</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.provision?.toLocaleString("ID-id") || 0}</p>
        </div>
        <div>
          <p className="mb-1 font-medium">Simpanan Wajib</p>
          <p className="text-zinc-600">Rp. {calculation?.terms?.mandatorySavings?.toLocaleString("ID-id") || 0}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-8 gap-3">
        <div>
          <p className="text-sm mb-1">Potongan</p>
          <Badge style="pippin">{`Rp. ${calculation?.deductionAmount?.toLocaleString("ID-id") || 0}`}</Badge>
        </div>
        <div>
          <p className="text-sm mb-1">Uang Diterima</p>
          <Badge style="rice">{`Rp. ${calculation?.receivedAmount?.toLocaleString("ID-id") || 0}`}</Badge>
        </div>
        <div className="flex items-center">
          <button onClick={props.installment} className="flex items-center text-sm mb-1 leading-none text-electron-300 hover:text-electron-700">
            Angsuran
            <ArrowIcon.Dart aim="rightTop" />
          </button>
        </div>
      </div>
    </Fragment>
  );
}

function SavingResult({ calculation }) {
  return (
    <div className="grid grid-cols-3 mt-5">
      <div>
        <p className="text-sm mb-1">Total</p>
        <Badge style="rice">{`Rp. ${calculation?.total?.toLocaleString("ID-id") || 0}`}</Badge>
      </div>
      <div>
        <p className="text-sm mb-1">Bunga</p>
        <Badge style="rice">{`Rp. ${calculation?.interest?.toLocaleString("ID-id") || 0}`}</Badge>
      </div>
      <div>
        <p className="text-sm mb-1">Profit</p>
        <Badge style="rice">{`Rp. ${calculation?.profit?.toLocaleString("ID-id") || 0}`}</Badge>
      </div>
    </div>
  );
}

function Calculator(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollateral, setSelectedCollateral] = useState(collaterals[0]);
  const [note, setNote] = useState("");
  const { product, id } = props;
  const { prodCtx } = useProductContext();
  const { submCtx } = useSubmContext();
  const { userCtx } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    prodCtx.calculate(id);
  }, [prodCtx.tenor, prodCtx.installment, prodCtx.loanFund, prodCtx.interestType]);

  async function create() {
    if (userCtx.isLoggedIn === false) {
      navigate("/login");
      return;
    }

    if (userCtx.me.status === "Nonaktif") {
      navigate("/profile");
      return;
    }

    let type = product.type === "Simpanan" ? "saving" : "loan";
    let data = {};

    if (type === "saving") {
      data = {
        productId: product.id,
        installment: prodCtx.installment,
        tenor: prodCtx.tenor,
      };
    } else if (type === "loan") {
      data = {
        productId: product.id,
        interest: product.interest,
        loanFund: prodCtx.loanFund,
        interestType: prodCtx.interestType,
        tenor: prodCtx.tenor,
        collateral: selectedCollateral,
        note: note,
      };
    }

    const result = await submCtx.create(type, data);
    navigate(`/dashboard/submission/${type}/${result.submId}`);
  }

  return (
    <Fragment>
      <div className="shadow-sm border border-gray-200 rounded-2xl">
        <div className="px-6 py-3 bg-gray-50 text-sm rounded-t-2xl border-b border-gray-200">
          <p className="font-medium">
            Pengajuan Produk <span className="font-sourcecodepro font-bold">{product.name}</span>
          </p>
          <p className="-mt-1 text-sm text-gray-500">@ {new Date().toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
        </div>
        <div className="px-6 py-4 pb-6">
          <div className="flex gap-x-10">
            <div>
              <p className="mb-2 text-sm">Tenor</p>
              <Radio data={product?.tenor} cols={4} value={prodCtx.tenor} onChange={prodCtx.setTenor} />
            </div>
            {product.type === "Pinjaman" && (
              <div className="w-40">
                <Input value={prodCtx.loanFund} action={prodCtx.setLoanFund} icon="currency" label="Dana Pinjaman" type="number" placeHolder="10.000.000" />
              </div>
            )}
            {product.type === "Pinjaman" && (
              <div className="">
                <p className="mb-2 text-sm">Jenis Bunga</p>
                <Radio value={prodCtx.interestType} onChange={prodCtx.setInterestType} data={interestAvilable}></Radio>
              </div>
            )}
            {product.type === "Simpanan" && (
              <div>
                <p className="text-sm mb-2">Angsuran</p>
                <div className="flex items-center">
                  <Radio value={prodCtx.installment} onChange={prodCtx.setInstallment} cols={3} data={product?.installment}></Radio>
                </div>
              </div>
            )}
          </div>
          {product.type === "Pinjaman" && (
            <div className="flex mt-3 text-sm gap-x-3">
              <div className="grow">
                <p className="mb-2">Catatan</p>
                <textarea
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  placeholder="Biaya wirausaha"
                  className="border resize-none px-3 py-2 focus:outline-none border-gray-200 w-full rounded-lg"
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
              <div className="w-64 text-sm">
                <div className="relative">
                  <p className="mb-2">Jaminan</p>
                  <RadioText data={collaterals} value={selectedCollateral} onChange={setSelectedCollateral} />
                </div>
              </div>
            </div>
          )}
          <hr className="my-3 h-px bg-gray-200 border-0"></hr>
          {product.type === "Simpanan" && <SavingResult calculation={prodCtx.calculation} />}
          {product.type === "Pinjaman" && <LoanResult calculation={prodCtx.calculation} installment={props.installment} />}
          <div className="mt-5 w-32">
            <Button
              action={() => {
                setIsOpen(true);
              }}
              text="Ajukan"
              style="cheerful"
              round="rounded-md"
              icon="arrow"
            />
            <Modal.Confirm show={isOpen} onClose={setIsOpen}>
              {userCtx.me.status === "Aktif" && userCtx.me.role !== "Warga" ? (
                <div className="text-sm">
                  <p className="text-center">
                    Anda akan mengajukan produk <span className="font-sourcecodepro font-bold">{product.name}</span>
                    <hr className="my-3 h-px bg-gray-200 border-0"></hr>
                  </p>
                  <div className="px-3 my-3 flex gap-x-3">
                    <div>
                      <p className="text-sm mb-1 text-center">Tenor</p>
                      <Badge style="magenta">{prodCtx.tenor} Bulan</Badge>
                    </div>
                    {product.type === "Simpanan" && (
                      <div>
                        <p className="text-sm mb-1 text-center">Angsuran</p>
                        <Badge style="rice">Rp. {prodCtx?.installment?.toLocaleString("ID-id")}</Badge>
                      </div>
                    )}
                    {product.type === "Pinjaman" && (
                      <>
                        <div>
                          <p className="text-sm mb-1 text-center">Dana</p>
                          <Badge style="rice">Rp. {prodCtx?.loanFund?.toLocaleString("ID-id")}</Badge>
                        </div>
                        <div>
                          <p className="text-sm mb-1 text-center">Potongan</p>
                          <Badge style="pippin">Rp. {prodCtx?.calculation?.deductionAmount?.toLocaleString("ID-id")}</Badge>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-sm mb-1 text-center">Setoran</p>
                      <Badge style="clear">{product.deposit}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6 gap-x-2">
                    <Button
                      action={() => {
                        setIsOpen(false);
                        create();
                      }}
                      text="Ajukan"
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    />
                    <Button
                      action={() => {
                        setIsOpen(false);
                      }}
                      text="Batal"
                      style="light"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  <div className="text-center">
                    <p>Anda belum dapat mengajukan produk karena status keanggotaan belum aktif.</p>
                    <p>Lengkapi profil dan lakukan pembayaran modal di koperasi untuk mengaktifkan keanggotaan</p>
                  </div>
                  <hr className="my-3 h-px bg-gray-200 border-0"></hr>
                  <div className="flex place-content-center gap-x-2">
                    <Button
                      action={() => {
                        setIsOpen(false);
                        navigate("/profile");
                        window.location.reload();
                      }}
                      text="Lengkapi Profil"
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    />
                    <Button
                      action={() => {
                        setIsOpen(false);
                        navigate("/#location");
                        window.location.reload();
                      }}
                      text="Lokasi"
                      style="light"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    />
                  </div>
                </div>
              )}
            </Modal.Confirm>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Calculator };
