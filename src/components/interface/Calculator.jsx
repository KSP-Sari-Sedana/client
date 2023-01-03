import { Fragment, useEffect } from "react";

import { Input } from "./Input";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Radio } from "./Radio";
import { ArrowIcon } from "../icons/ArrowIcon";
import { useProductContext } from "../../context/productContext";

const interestAvilable = ["Menurun", "Tetap"];

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
            <ArrowIcon aim="rightTop" />
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
        <div className="px-6 py-4 pb-6">
          <div className="flex gap-x-10">
            <div>
              <p className="mb-2 text-sm">Tenor</p>
              <Radio data={product?.tenor} cols={4} value={tenor} onChange={setTenor} />
            </div>
            {product.type === "Pinjaman" && (
              <div className="w-40">
                <Input value={loanFund} action={setLoanFund} icon="currency" label="Dana Pinjaman" type="number" placeHolder="10.000.000" />
              </div>
            )}
            {product.type === "Pinjaman" && (
              <div className="">
                <p className="mb-2 text-sm">Jenis Bunga</p>
                <Radio value={interestType} onChange={setInterestType} data={interestAvilable}></Radio>
              </div>
            )}
            {product.type === "Simpanan" && (
              <div>
                <p>Angsuran</p>
                <div className="flex items-center">
                  <Radio value={installment} onChange={setInstallment} cols={3} data={product?.installment}></Radio>
                </div>
              </div>
            )}
          </div>
          <hr className="my-3 h-px bg-gray-200 border-0"></hr>
          {product.type === "Simpanan" && <SavingResult calculation={calculation} />}
          {product.type === "Pinjaman" && <LoanResult calculation={calculation} installment={props.installment} />}
          <div className="mt-5 w-32">
            <Button text="Ajukan" style="cheerful" round="rounded-md" icon="arrow" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Calculator };
