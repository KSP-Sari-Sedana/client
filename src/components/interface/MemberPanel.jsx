import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { HolderIcon } from "../icons/HolderIcon";
import { UpsssArt } from "../art/UpsssArt";
import { useSubmContext } from "../../context/submContext";
import { useProductContext } from "../../context/productContext";
import { useHelperContext } from "../../context/helperContext";
import { useSummaryContext } from "../../context/summaryContext";
import { ArrowIcon } from "../icons/ArrowIcon";

function Summary() {
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { summCtx } = useSummaryContext();
  const { helpCtx } = useHelperContext();

  useEffect(() => {
    getSummary();
  }, []);

  async function getSummary() {
    setSummary(await summCtx.getSummary());
    setIsLoading(false);
  }

  return (
    <Fragment>
      {isLoading ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div>
          {summary && (
            <div className="grid grid-cols-3 gap-3 place-self-stretch min-w-max text-sm">
              <div className="bg-white border rounded-xl px-4 py-3 flex items-center gap-x-3">
                <HolderIcon.Square />
                <div className="grow">
                  <p className="font-medium mb-1">Total tabungan</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 mt-1 text-clear-600">{helpCtx.formatRupiah(summary.saving.balance)}</p>
                </div>
              </div>
              <div className="col-span-2 bg-white border rounded-xl px-4 py-3 flex gap-x-3">
                <HolderIcon.Square />
                <div className="grow flex items-center justify-between gap-x-3">
                  <div>
                    <p className="font-medium mb-1">Total pinjaman</p>
                    <p className="font-darkergrotesque text-lg font-extrabold leading-4 mt-1 text-bethlehem-500">{helpCtx.formatRupiah(summary.loan.loanTotal)}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Total pembayaran</p>
                    <p className="font-darkergrotesque text-lg font-extrabold leading-4 mt-1 text-clear-600">{helpCtx.formatRupiah(summary.loan.totalLoanPayment)}</p>
                  </div>
                  <div className="pr-3">
                    <p className="font-medium mb-1">Total sisa pinjaman</p>
                    <p className="font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ">{helpCtx.formatRupiah(summary.loan.loanBalance)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

function Submission() {
  const [subms, setSubms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { submCtx } = useSubmContext();

  useEffect(() => {
    getSubms();
  }, []);

  async function getSubms() {
    setSubms(await submCtx.getByUser());
    setIsLoading(false);
  }

  return (
    <Fragment>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Pengajuan</p>
      {isLoading ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div className="grid grid-cols-3 gap-3 min-w-max">
          {subms.map((subm, index) => {
            return (
              <Link key={index} to={`${subm.productType === "Simpanan" ? "saving" : "loan"}/${subm.submId}`}>
                <Card.Submission submDate={subm.submDate} productName={subm.productName} productType={subm.productType} status={subm.status} />
              </Link>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

function SubmissionDetail() {
  const [subm, setSubm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { id, type } = useParams();
  const { submCtx } = useSubmContext();
  const { helpCtx } = useHelperContext();
  const navigate = useNavigate();

  useEffect(() => {
    getSubm();
  }, []);

  async function getSubm() {
    setSubm(await submCtx.getSubmById(id, type));
    setIsLoading(false);
  }

  async function cancelSubm() {
    await submCtx.cancelSubm(id, type);
    navigate("/dashboard/submission");
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Pengajuan Anda</p>
      {isLoading ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div className="flex gap-x-4">
          <div>
            <Card.Submission submDate={subm.submDate} productName={subm.productName} productType={subm.productType} status={subm.status} />
            <div className="flex mt-3 ml-3">
              <Button
                action={() => {
                  setIsOpen(true);
                }}
                text={subm.status === "Ditinjau" ? "Batalkan" : subm.status === "Ditolak" ? "Hapus" : "Batalkan"}
                style="bethlehem"
                round="rounded-full"
                height="py-1"
                width="px-4"
                isDisable={subm.status === "Diterima" ? true : false}
              />
              <Modal.Confirm show={isOpen} onClose={setIsOpen} className="text-sm">
                <p className="text-sm">
                  Yakin ingin {subm.status === "Ditinjau" ? "membatalkan" : subm.status === "Ditolak" && "menghapus"} pengajuan{" "}
                  <span className="font-sourcecodepro font-bold">{subm.productName} </span>
                  {helpCtx.getFullDate(subm.submDate)}?
                </p>
                <div className="flex justify-center mt-3 gap-x-3">
                  <Button
                    action={() => {
                      setIsOpen(false);
                    }}
                    text="Tidak"
                    style="electron"
                    round="rounded-full"
                    height="py-1"
                    width="px-4"
                  />
                  <Button
                    action={() => {
                      setIsOpen(false);
                      cancelSubm();
                    }}
                    text={subm.status === "Ditinjau" ? "Batalkan" : subm.status === "Ditolak" ? "Hapus" : "Batalkan"}
                    style="bethlehem"
                    round="rounded-full"
                    height="py-1"
                    width="px-4"
                  />
                </div>
              </Modal.Confirm>
            </div>
          </div>
          <div className="grow min-w-max">
            <div className="border rounded-2xl bg-white text-sm">
              <div className="px-6 py-3 bg-white rounded-t-2xl border-b border-gray-200">
                <p className="font-medium">
                  Detail Pengajuan Produk <span className="font-sourcecodepro font-bold">{subm.productName}</span>
                </p>
                <p className="-mt-1 text-sm text-gray-500">@ {new Date(subm.submDate).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
              </div>
              <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                <p className="w-1/2">Nama produk</p>
                <p className="w-1/2 font-sourcecodepro font-bold">{subm.productName}</p>
              </div>
              <div className="h-11 px-6 bg-white border-b flex items-center">
                <p className="w-1/2">Tipe produk</p>
                <Badge style={`${subm.productType === "Simpanan" ? "clear" : "magenta"}`}>{subm.productType}</Badge>
              </div>
              {type === "saving" && (
                <Fragment>
                  <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                    <p className="w-1/2">Angsuran</p>
                    <p className="w-1/2">{helpCtx.formatRupiah(subm.installment)}</p>
                  </div>
                  <div className="h-11 px-6 bg-white border-b flex items-center">
                    <p className="w-1/2">Tenor</p>
                    <p className="w-1/2">{`${subm.deposit === "Sekali" ? "Hanya dibayarkan sekali" : `${subm.tenor ? subm.tenor + " bulan" : "Selama menjadi anggota koperasi"}`}`}</p>
                  </div>
                </Fragment>
              )}
              {type === "loan" && (
                <Fragment>
                  <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                    <p className="w-1/2">Dana pinjaman</p>
                    <p className="w-1/2">Rp. {subm?.loanFund?.toLocaleString("ID-id")}</p>
                  </div>
                  <div className="h-11 px-6 bg-white border-b flex items-center">
                    <p className="w-1/2">Bunga pinjaman</p>
                    <p className="w-1/2">{subm.interest}%</p>
                  </div>
                  <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                    <p className="w-1/2">Tenor</p>
                    <p className="w-1/2">{subm.tenor} bulan</p>
                  </div>
                  <div className="h-11 px-6 bg-white border-b flex items-center">
                    <p className="w-1/2">Tipe bunga</p>
                    <p className="w-1/2">{subm.interestType}</p>
                  </div>
                  <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                    <p className="w-1/2">Jaminan</p>
                    <p className="w-1/2">{subm.collateral}</p>
                  </div>
                  <div className="h-11 px-6 bg-white border-b flex items-center">
                    <p className="w-1/2">Catatan</p>
                    <p className="w-1/2">{subm.note}</p>
                  </div>
                </Fragment>
              )}
              <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                <p className="w-1/2">Tanggal pengajuan</p>
                <p className="w-1/2">{new Date(subm.submDate).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
              </div>
              <div className="h-11 px-6 bg-white rounded-b-2xl flex items-center">
                <p className="w-1/2">Status pengajuan</p>
                <Badge style={subm.status === "Ditinjau" ? "buttercup" : subm.status === "Diterima" ? "rice" : "pippin"}>{subm.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Saving() {
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const { prodCtx } = useProductContext();

  useEffect(() => {
    getConsumedProducts();
  }, []);

  async function getConsumedProducts() {
    setConsumedProducts(await prodCtx.getConsumedProducts("saving"));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Simpanan</p>
      {isLoding ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div className="grid grid-cols-4 gap-3 min-w-max">
          {consumedProducts.map((product, index) => {
            return (
              <Link key={index} to={`${product.submId}`}>
                <Card.Consumed productName={product.productName} productType={product.productType} accNumber={product.accNumber} balance={product.balance.toLocaleString("ID-id")} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SavingDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [consumedProduct, setConsumedProduct] = useState({});
  const { id } = useParams();
  const { prodCtx } = useProductContext();

  async function getConsumedProduct() {
    setConsumedProduct(await prodCtx.getConsumedProductById(id, "saving"));
    setIsLoading(false);
  }

  useEffect(() => {
    getConsumedProduct();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi</p>
          <Spinner text="Loading" className="text-slate-700 place-content-center" />
        </div>
      ) : (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi {consumedProduct.productName}</p>
          <div className="flex gap-x-3">
            <Card.Consumed
              settleDate={consumedProduct.settleDate}
              productName={consumedProduct.productName}
              productType={consumedProduct.productType}
              accNumber={consumedProduct.accNumber}
              balance={consumedProduct.balance.toLocaleString("Id-id")}
              accStatus={consumedProduct.status}
            />
            <Card.ConsumedAlert
              nextPaymentDate={consumedProduct?.transDetail[consumedProduct?.transDetail?.length - 1]?.date || consumedProduct.settleDate}
              deposit={consumedProduct.deposit}
              settleDate={consumedProduct.settleDate}
              tenor={consumedProduct.tenor}
              accStatus={consumedProduct.status}
            />
          </div>
          <div className="mt-4">
            <p className="text-sm mb-2 ml-2">Riwayat Transaksi</p>
            <div className="border rounded-2xl bg-white text-sm">
              <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
                <div className="grid grid-cols-5 font-medium">
                  <p>Tanggal</p>
                  <p>Sandi</p>
                  <p>Setoran</p>
                  <p>Penarikan</p>
                  <p>Saldo</p>
                </div>
              </div>
              <div>
                {consumedProduct.transDetail.length <= 0 ? (
                  <div className="py-2 text-center">
                    <p>Riwayat transaksi tidak tersedia</p>
                  </div>
                ) : (
                  <Fragment>
                    {consumedProduct.transDetail.map((trans, index) => {
                      return (
                        <div
                          className={`grid grid-cols-5 py-[6px] px-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                            consumedProduct.transDetail.length === index + 1 && "rounded-b-2xl"
                          }`}
                        >
                          <p>{new Date(trans.date).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
                          <Badge style={`${trans.code === "Setoran" ? "rice" : trans.code === "Bunga" ? "clear" : trans.code === "Penarikan" ? "pippin" : "magenta"}`}>{trans.code}</Badge>
                          <p>{`${trans.debit ? `Rp. ${trans.debit.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.credit ? `Rp. ${trans.credit.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.balance ? `Rp. ${trans.balance.toLocaleString("ID-id")}` : ""}`}</p>
                        </div>
                      );
                    })}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Loan() {
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { prodCtx } = useProductContext();

  useEffect(() => {
    getConsumedProducts();
  }, []);

  async function getConsumedProducts() {
    setConsumedProducts(await prodCtx.getConsumedProducts("loan"));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Pinjaman</p>
      {isLoading ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div>
          {consumedProducts.length <= 0 ? (
            <div className="flex items-center justify-center mt-20">
              <div className="flex flex-col">
                <div>
                  <UpsssArt />
                </div>
                <p className="text-center text-sm mt-2">Data tidak ditemukan</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 min-w-max">
              {consumedProducts.map((product, index) => {
                return (
                  <Link key={index} to={`${product.submId}`}>
                    <Card.Consumed productName={product.productName} productType={product.productType} accNumber={product.accNumber} balance={product.loanBalance?.toLocaleString("ID-id")} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LoanDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [consumedProduct, setConsumedProduct] = useState({});
  const { id } = useParams();
  const { prodCtx } = useProductContext();

  async function getConsumedProduct() {
    setConsumedProduct(await prodCtx.getConsumedProductById(id, "loan"));
    setIsLoading(false);
  }

  useEffect(() => {
    getConsumedProduct();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi</p>
          <Spinner text="Loading" className="text-slate-700 place-content-center" />
        </div>
      ) : (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi {consumedProduct.productName}</p>
          <div className="flex gap-x-3">
            <Card.Consumed
              settleDate={consumedProduct.settleDate}
              productName={consumedProduct.productName}
              productType={consumedProduct.productType}
              accNumber={consumedProduct.accNumber}
              balance={consumedProduct.loanBalance?.toLocaleString("Id-id")}
              accStatus={consumedProduct.status}
            />
            <Card.ConsumedAlert
              nextPaymentDate={consumedProduct?.transDetail[consumedProduct?.transDetail?.length - 1]?.date || consumedProduct.settleDate}
              deposit={consumedProduct.deposit}
              settleDate={consumedProduct.settleDate}
              tenor={consumedProduct.tenor}
              accStatus={consumedProduct.status}
            />
          </div>
          <div className="mt-4 min-w-max">
            <p className="text-sm mb-2 ml-2">Riwayat Transaksi</p>
            <div className="border rounded-2xl overflow-hidden bg-white text-sm">
              <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
                <div className="grid grid-cols-6 font-medium">
                  <p>Tanggal</p>
                  <p>Pokok</p>
                  <p>Bunga</p>
                  <p>Denda</p>
                  <p>Total</p>
                  <p>Sisa Pinjaman</p>
                </div>
              </div>
              <div>
                {consumedProduct.transDetail.length <= 0 ? (
                  <div className="py-2 text-center">
                    <p>Riwayat transaksi tidak tersedia</p>
                  </div>
                ) : (
                  <Fragment>
                    {consumedProduct.transDetail.map((trans, index) => {
                      return (
                        <div className={`grid grid-cols-6 py-[10px] px-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                          <p>{new Date(trans.date).toLocaleString("ID-id", { month: "short", day: "2-digit", year: "numeric" })}</p>
                          <p>{`${trans.principal ? `Rp. ${trans.principal.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.interest ? `Rp. ${trans.interest.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.penaltyFee ? `Rp. ${trans.penaltyFee.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.total ? `Rp. ${trans.total.toLocaleString("ID-id")}` : ""}`}</p>
                          <p>{`${trans.loanBalance ? `Rp. ${trans.loanBalance.toLocaleString("ID-id")}` : ""}`}</p>
                        </div>
                      );
                    })}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Member = {
  Summary,
  Submission,
  SubmissionDetail,
  Saving,
  SavingDetail,
  Loan,
  LoanDetail,
};

export { Member };
