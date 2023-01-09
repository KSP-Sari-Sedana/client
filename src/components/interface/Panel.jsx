import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { useSubmContext } from "../../context/submContext";
import { useUserContext } from "../../context/userContext";
import { useProductContext } from "../../context/productContext";

function UserSummary() {
  return <div></div>;
}

function UserSubmission() {
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
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Pengajuan</p>
      {isLoading ? (
        <div className="text-sm flex items-center text-zinc-500">
          <SpinnerIcon /> Mengambil data
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-y-6">
          {subms.map((subm, index) => {
            return (
              <Link to={`${subm.productType === "Simpanan" ? "saving" : "loan"}/${subm.submId}`}>
                <Card.Submission key={index} submDate={subm.submDate} productName={subm.productName}>
                  <Badge style={subm.status === "Ditinjau" ? "buttercup" : subm.status === "Diterima" ? "rice" : "pippin"}>{subm.status}</Badge>
                  <Badge style="clear">{subm.productType}</Badge>
                </Card.Submission>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserSubmissionDetail() {
  const [subm, setSubm] = useState({});
  const [isLoding, setIsLoading] = useState(true);
  const { id, type } = useParams();
  const { submCtx } = useSubmContext();
  const { userCtx } = useUserContext();

  useEffect(() => {
    getSubm();
  }, []);

  async function getSubm() {
    setSubm(await submCtx.getSubmById(id, type));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">
        Detail pengajuan {subm.productName} oleh {userCtx.me.firstName} {userCtx.me.lastName}
      </p>
      {isLoding ? (
        <div className="text-sm flex items-center text-zinc-500">
          <SpinnerIcon /> Mengambil data
        </div>
      ) : (
        <div className="flex gap-x-4">
          <Card.Submission submDate={subm.submDate} productName={subm.productName}>
            <Button text="Batalkan Pengajuan" style="bethlehem" round="rounded-full" height="py-1" width="px-4" isDisable={subm.status === "Diterima" ? true : false} />
          </Card.Submission>
          <div className="grow">
            <div className="border rounded-2xl bg-white text-sm">
              <div className="px-6 py-3 bg-clear-50 rounded-t-2xl border-b border-gray-200 text-base">
                <p className="font-medium">
                  Detail Pengajuan Produk <span className="font-sourcecodepro font-bold">{subm.productName}</span>
                </p>
                <p className="-mt-1 text-sm text-gray-500">@ {new Date(subm.submDate).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
              </div>
              <div className="h-11 px-6 bg-white border-b flex items-center">
                <p className="w-1/2">Nama</p>
                <div className="w-1/2 flex items-center gap-x-2">
                  <Avatar dimension="w-6 h-6" />
                  <p>{`${userCtx.me.firstName} ${userCtx.me.lastName}`}</p>
                </div>
              </div>
              <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                <p className="w-1/2">Nama produk</p>
                <p className="w-1/2 font-sourcecodepro font-bold">{subm.productName}</p>
              </div>
              <div className="h-11 px-6 bg-white border-b flex items-center">
                <p className="w-1/2">Tipe produk</p>
                <Badge style="clear">{subm.productType}</Badge>
              </div>
              {type === "saving" && (
                <Fragment>
                  <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
                    <p className="w-1/2">Angsuran</p>
                    <p className="w-1/2">Rp. {subm?.installment?.toLocaleString("ID-id")}</p>
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

function UserSaving() {
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
        <div className="text-sm flex items-center text-zinc-500">
          <SpinnerIcon /> Mengambil data
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-y-6">
          {consumedProducts.map((product, index) => {
            return (
              <Link to={`/dashboard/saving/${product.id}`}>
                <Card.Saving key={index} settleDate={product.settleDate} productName={product.productName} accNumber={product.accNumber} balance={product.balance.toLocaleString("ID-id")} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserSavingDetail() {
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
          <div className="text-sm flex items-center text-zinc-500">
            <SpinnerIcon /> Mengambil data
          </div>
        </div>
      ) : (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi {consumedProduct.productName}</p>
          <Card.Saving
            settleDate={consumedProduct.settleDate}
            productName={consumedProduct.productName}
            accNumber={consumedProduct.accNumber}
            balance={consumedProduct.balance.toLocaleString("Id-id")}
          />
          <div className="mt-4">
            <p className="text-sm mb-2 ml-2">Riwayat Transaksi</p>
            <div className="border rounded-2xl bg-white text-sm">
              <div className="px-6 py-4 bg-clear-50 rounded-t-2xl border-b border-gray-200">
                <div className="grid grid-cols-5 font-medium">
                  <p>Tanggal</p>
                  <p>Sandi</p>
                  <p>Debit</p>
                  <p>Kredit</p>
                  <p>Saldo</p>
                </div>
              </div>
              <div>
                {consumedProduct.transDetail.map((trans, index) => {
                  return (
                    <div
                      className={`grid grid-cols-5 py-[10px] px-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${consumedProduct.transDetail.length === index + 1 && "rounded-b-2xl"}`}
                    >
                      <p>{new Date(trans.date).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
                      <Badge style={`${trans.code === "Debit" ? "rice" : "pippin"}`}>{trans.code}</Badge>
                      <p>{`${trans.debit ? `Rp. ${trans.debit.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.credit ? `Rp. ${trans.credit.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.balance ? `Rp. ${trans.balance.toLocaleString("ID-id")}` : ""}`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserLoan() {
  return <div></div>;
}

function AdminSummary() {
  return <div></div>;
}

function AdminSubmission() {
  return <div></div>;
}

function AdminTransaction() {
  return <div></div>;
}

function AdminProduct() {
  return <div></div>;
}

function AdminUser() {
  return <div></div>;
}

function TellerTransaction() {
  return <div></div>;
}

const Panel = {
  UserSummary,
  UserSubmission,
  UserSubmissionDetail,
  UserSaving,
  UserSavingDetail,
  UserLoan,
  AdminSummary,
  AdminSubmission,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { Panel };
