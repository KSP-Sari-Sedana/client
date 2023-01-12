import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Tab, RadioGroup } from "@headlessui/react";

import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { StarIcon } from "../icons/StarIcon";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
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
              <Link key={index} to={`${product.id}`}>
                <Card.Consumed
                  settleDate={product.settleDate}
                  productName={product.productName}
                  productType={product.productType}
                  accNumber={product.accNumber}
                  balance={product.balance.toLocaleString("ID-id")}
                />
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
          <Card.Consumed
            settleDate={consumedProduct.settleDate}
            productName={consumedProduct.productName}
            productType={consumedProduct.productType}
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
        <div className="text-sm flex items-center text-zinc-500">
          <SpinnerIcon /> Mengambil data
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-y-6">
          {consumedProducts.map((product, index) => {
            return (
              <Link key={index} to={`${product.id}`}>
                <Card.Consumed
                  settleDate={product.settleDate}
                  productName={product.productName}
                  productType={product.productType}
                  accNumber={product.accNumber}
                  balance={product.loanBalance.toLocaleString("ID-id")}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserLoanDetail() {
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
          <div className="text-sm flex items-center text-zinc-500">
            <SpinnerIcon /> Mengambil data
          </div>
        </div>
      ) : (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Transaksi {consumedProduct.productName}</p>
          <Card.Consumed
            settleDate={consumedProduct.settleDate}
            productName={consumedProduct.productName}
            productType={consumedProduct.productType}
            accNumber={consumedProduct.accNumber}
            balance={consumedProduct.loanBalance.toLocaleString("Id-id")}
          />
          <div className="mt-4 min-w-max">
            <p className="text-sm mb-2 ml-2">Riwayat Transaksi</p>
            <div className="border rounded-2xl bg-white text-sm">
              <div className="px-6 py-4 bg-clear-50 rounded-t-2xl border-b border-gray-200">
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
                {consumedProduct.transDetail.map((trans, index) => {
                  return (
                    <div
                      className={`grid grid-cols-6 py-[10px] px-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${consumedProduct.transDetail.length === index + 1 && "rounded-b-2xl"}`}
                    >
                      <p>{new Date(trans.date).toLocaleString("id-ID", { month: "short", day: "2-digit", year: "numeric" })}</p>
                      <p>{`${trans.principal ? `Rp. ${trans.principal.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.interest ? `Rp. ${trans.interest.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.penaltyFee ? `Rp. ${trans.penaltyFee.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.total ? `Rp. ${trans.total.toLocaleString("ID-id")}` : ""}`}</p>
                      <p>{`${trans.loanBalance ? `Rp. ${trans.loanBalance.toLocaleString("ID-id")}` : ""}`}</p>
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

function AdminSummary() {
  return <div></div>;
}

function AdminSubmission() {
  const [isLoading, setIsLoading] = useState(true);
  const [submSaving, setSubmSaving] = useState([]);
  const [submLoan, setSubmLoan] = useState([]);
  const { submCtx } = useSubmContext();

  useEffect(() => {
    getSubmSaving();
  }, []);

  async function getSubmSaving() {
    setSubmSaving(await submCtx.get("saving"));
    setSubmLoan(await submCtx.get("loan"));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Semua Pengajuan</p>
      <Tab.Group>
        <Tab.List>
          <Tab className="mr-3 py-1 px-3 border rounded-md">Simpanan</Tab>
          <Tab className="mr-3 py-1 px-3 border rounded-md">Pinjaman</Tab>
        </Tab.List>
        <Tab.Panels>
          <div>
            <Tab.Panel>
              <div className="mt-4 min-w-max">
                <div className="border rounded-2xl bg-white text-sm">
                  <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
                    <div className="flex font-medium">
                      <p className="w-[37%]">Nama</p>
                      <p className="w-[26%]">Produk</p>
                      <p className="w-[20%]">Tanggal</p>
                      <p className="w-[23%]">Angsuran</p>
                      <p className="w-[20%]">Tenor</p>
                      <p className="w-[20%]">Status</p>
                    </div>
                  </div>
                  <div>
                    {isLoading ? (
                      <div className={`py-[10px] px-6 items-center justify-items-center`}>
                        <div className="place-content-center flex items-center">
                          <SpinnerIcon /> Mengambil data
                        </div>
                      </div>
                    ) : (
                      <div>
                        {submSaving.map((subm, index) => {
                          return (
                            <Link
                              to={`saving/${subm.submId}`}
                              className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                                submSaving.length === index + 1 && "rounded-b-2xl"
                              }`}
                            >
                              <div className="flex items-center gap-x-2 col-span-2 w-[37%] ">
                                <div>
                                  <Avatar dimension="w-7 h-7" src={subm.image} />
                                </div>
                                <div>
                                  <p className="leading-none font-medium">{subm.fullName}</p>
                                  <div className="flex items-center">
                                    <StarIcon role={subm.role} />
                                    <p className="font-sourcecodepro text-xs text-gray-600">{subm.role}</p>
                                  </div>
                                </div>
                              </div>
                              <p className=" w-[26%] font-sourcecodepro font-bold">{subm.productName}</p>
                              <p className=" w-[20%] ">{new Date(subm.submDate).toLocaleString("id-ID", { month: "short", day: "2-digit", year: "numeric" })}</p>
                              <p className=" w-[23%] ">Rp. {subm.installment.toLocaleString("ID-id")}</p>
                              <p className=" w-[20%] ">{subm.tenor ? subm.tenor + " bulan" : ""}</p>
                              <div className=" w-[20%] ">
                                <Badge style={`${subm.status === "Diterima" ? "rice" : subm.status === "Ditinjau" ? "buttercup" : "pippin"}`}>{subm.status}</Badge>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-4 min-w-max">
                <div className="border rounded-2xl bg-white text-sm">
                  <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
                    <div className="flex font-medium">
                      <p className="w-[37%]">Nama</p>
                      <p className="w-[20%]">Produk</p>
                      <p className="w-[20%]">Tanggal</p>
                      <p className="w-[24%]">Pinjaman</p>
                      <p className="w-[20%]">Tenor</p>
                      <p className="w-[20%]">Jaminan</p>
                      <p className="w-[20%]">Status</p>
                    </div>
                  </div>
                  <div>
                    {isLoading ? (
                      <div className={`py-[10px] px-6 items-center justify-items-center`}>
                        <div className="place-content-center flex items-center">
                          <SpinnerIcon /> Mengambil data
                        </div>
                      </div>
                    ) : (
                      <div>
                        {submLoan.map((subm, index) => {
                          return (
                            <Link
                              to={`loan/${subm.submId}`}
                              className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                                submLoan.length === index + 1 && "rounded-b-2xl"
                              }`}
                            >
                              <div className="flex items-center gap-x-2 col-span-2 w-[37%] ">
                                <div>
                                  <Avatar dimension="w-7 h-7" src={subm.image} />
                                </div>
                                <div>
                                  <p className="leading-none font-medium">{subm.fullName}</p>
                                  <div className="flex items-center">
                                    <StarIcon role={subm.role} />
                                    <p className="font-sourcecodepro text-xs text-gray-600">{subm.role}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[20%] font-sourcecodepro font-bold uppercase">
                                <span>
                                  {subm.productName} <br /> <p className="leading-none">{subm.interestType}</p>{" "}
                                </span>
                              </div>
                              <p className="w-[20%]">{new Date(subm.submDate).toLocaleString("id-ID", { month: "short", day: "2-digit", year: "numeric" })}</p>
                              <p className="w-[24%]">Rp. {subm.loanFund.toLocaleString("ID-id")}</p>
                              <p className="w-[20%]">{subm.tenor ? subm.tenor + " bulan" : ""}</p>
                              <p className="w-[20%]">{subm.collateral}</p>
                              <div className=" w-[20%] ">
                                <Badge style={`${subm.status === "Diterima" ? "rice" : subm.status === "Ditinjau" ? "buttercup" : "pippin"}`}>{subm.status}</Badge>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function AdminSubmissionDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [subm, setSubm] = useState({});

  const { submCtx } = useSubmContext();
  const { type, id } = useParams();

  useEffect(() => {
    getSubm();
  }, []);

  async function getSubm() {
    setSubm(await submCtx.getSubmById(id, type));
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Pengajuan</p>
          <div className="text-sm flex items-center text-zinc-500">
            <SpinnerIcon /> Mengambil data
          </div>
        </div>
      ) : (
        <div className="grow">
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">
            Detail Pengajuan {subm.productName} oleh {subm.firstName} {subm.lastName}
          </p>
          <div>
            <div className="flex gap-x-3">
              <div className="flex items-center gap-x-3">
                <div>
                  <Avatar src={subm.image} />
                </div>
                <div className="grow">
                  <p className="font-extrabold leading-none font-sourcecodepro uppercase">{`${subm.firstName} ${subm.lastName}`}</p>
                  <div className="flex items-center">
                    <StarIcon role={subm.role} />
                    <p className="text-sm text-slate-500 leading-tight font-sourcecodepro font-medium">{subm.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-6 mt-5 text-sm font-medium min-w-max w-full">
              <p className="w-[20%] min-w-max">Nama depan</p>
              <p className="w-[20%] min-w-max">Nama belakang</p>
              <p className="w-[30%]">E-mail</p>
              <p className="w-[23%] min-w-max">Whats App</p>
              <p className="w-[20%] min-w-max">Status keanggotaan</p>
            </div>
            <div className="flex px-6 text-sm text-gray-500 items-center w-full">
              <p className="w-[20%]">{subm.firstName}</p>
              <p className="w-[20%]">{subm.lastName}</p>
              <p className="w-[30%]">{subm.email}</p>
              <div className="flex items-center gap-x-1 w-[23%]">
                <WhatsAppIcon />
                <a className="text-gray-500 hover:text-clear-700 flex items-center" href={`https://wa.me/${subm?.cellphone?.substring(1)}`} target="_blank">
                  {subm.cellphone}
                  <ArrowIcon aim="rightTop" />
                </a>
              </div>
              <div className="w-[20%]">
                <Badge style={`${subm.userStatus === "Aktif" ? "clear" : subm.userStatus === "Ditinjau" ? "buttercup" : "pippin"}`}>{subm.userStatus}</Badge>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl bg-white text-sm mt-6">
            <div className="px-6 py-3 rounded-t-2xl border-b border-gray-200 text-base flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Detail Pengajuan Produk{" "}
                  <span className="font-sourcecodepro font-bold uppercase">
                    {subm.productName} {subm.interestType}
                  </span>
                </p>
                <p className="-mt-1 text-sm text-gray-500">@ {new Date(subm.submDate).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" })}</p>
              </div>
              <div>
                <Badge style={subm.status === "Ditinjau" ? "buttercup" : subm.status === "Diterima" ? "rice" : "pippin"}>{subm.status}</Badge>
              </div>
            </div>
            <div className="h-11 px-6 bg-gray-50 border-b flex items-center">
              <p className="w-1/2">Nama produk</p>
              <p className="w-1/2 font-sourcecodepro font-bold uppercase">
                {subm.productName} {subm.interestType}
              </p>
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
                <div className="h-11 px-6 bg-white rounded-b-2xl flex items-center">
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
                  <p className="w-1/2">Jaminan</p>
                  <p className="w-1/2">{subm.collateral}</p>
                </div>
                <div className="h-11 px-6 py-7 rounded-b-2xl bg-gray-50 flex items-center">
                  <p className="w-1/2">Catatan</p>
                  <p className="w-1/2">{subm.note}</p>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [consumedProducts, setConsumedProducts] = useState([]);
  const { userCtx } = useUserContext();
  const { prodCtx } = useProductContext();

  useEffect(() => {
    getTransactionDetail();
  }, [username]);

  async function getTransactionDetail() {
    if (!username) return;

    setIsLoading(true);
    const user = await userCtx.getByUsername(username);
    setUser(user);

    if (user.username) {
      const saving = await prodCtx.getConsumedProducts("saving", user.username);
      setConsumedProducts(saving);
      const loan = await prodCtx.getConsumedProducts("loan", user.username);
      setConsumedProducts((prev) => [...prev, ...loan]);
    } else {
      setConsumedProducts([]);
    }

    setIsLoading(false);
  }

  return (
    <div className="text-sm">
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Tambah Transaksi</p>
      <p className="mb-1">Username</p>
      <div className="flex items-center gap-x-3">
        <Input placeHolder="bagussuprapta" icon="fingerPrint" action={setUsername} />
        {isLoading ? (
          <div className="flex items-center mb-2">
            <SpinnerIcon />
            <p>Mencari User</p>
          </div>
        ) : (
          <div>
            {user.username ? (
              <div className="flex items-center gap-x-2 mb-2">
                <div>
                  <Avatar dimension="w-8 h-8" src={user.image || "https://source.boringavatars.com/pixel/120?square"} />
                </div>
                <div className="grow">
                  <p className="font-extrabold leading-none font-sourcecodepro uppercase">
                    {user.firstName} {user.lastName}
                  </p>
                  <div className="flex items-center">
                    <StarIcon role={user.role} />
                    <p className="text-sm text-slate-500 leading-tight font-sourcecodepro font-medium">{user.role}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {username && (
                  <div className="mb-2">
                    <p className="text-bethlehem-600">User tidak ditemukan</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {user.username && (
        <div>
          {consumedProducts.length === 0 ? (
            <div>
              <p className="ml-2">
                {user.firstName} {user.lastName} tidak menikmati produk apapun
              </p>
            </div>
          ) : (
            <div>
              <p className="ml-2 mb-3">
                Pilih produk yang dinikmati oleh {user.firstName} {user.lastName}
              </p>
              <div>
                <div className="flex flex-wrap justify-between gap-y-6">
                  {consumedProducts.map((product, index) => {
                    let formatedAccNumber = "";
                    for (let i = 0; i < product.accNumber?.toString().length; i++) {
                      if (i > 0 && (i + 1) % 3 === 0) {
                        formatedAccNumber += " ";
                      }
                      formatedAccNumber += product.accNumber?.toString()[i];
                    }

                    return (
                      <div key={index}>
                        <div className={`border rounded-xl cursor-pointer bg-white w-52 h-20 text-sm leading-4 flex items-center py-6 px-5`}>
                          <div className="grow">
                            <div className="flex-col">
                              <p className="font-sourcecodepro text-lg font-extrabold leading-4">{product.productName}</p>
                              <p className="font-sourcecodepro font-semibold leading-4">rek: {formatedAccNumber}</p>
                              <p className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${product.productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"}`}>
                                Rp. {product.loanBalance?.toLocaleString("ID-id") || product.balance?.toLocaleString("ID-id")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
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
  UserLoanDetail,
  AdminSummary,
  AdminSubmission,
  AdminSubmissionDetail,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { Panel };
