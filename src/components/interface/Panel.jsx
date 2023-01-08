import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { useSubmContext } from "../../context/submContext";
import { useUserContext } from "../../context/userContext";

function UserSummary() {
  return <div></div>;
}

function UserSubmission() {
  const [subms, setSubms] = useState([]);
  const { submCtx } = useSubmContext();

  useEffect(() => {
    getSubms();
  }, []);

  async function getSubms() {
    setSubms(await submCtx.getByUser());
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar pengajuan</p>
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
    </div>
  );
}

function UserSubmissionDetail() {
  const [subm, setSubm] = useState({});
  const { id, type } = useParams();
  const { submCtx } = useSubmContext();
  const { userCtx } = useUserContext();

  useEffect(() => {
    getSubm();
  }, []);

  async function getSubm() {
    setSubm(await submCtx.getSubmById(id, type));
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">
        Detail pengajuan {subm.productName} oleh {userCtx.me.firstName} {userCtx.me.lastName}
      </p>
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
    </div>
  );
}

function UserSaving() {
  return <div></div>;
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
  UserLoan,
  AdminSummary,
  AdminSubmission,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { Panel };
