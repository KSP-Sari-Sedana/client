import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";

import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { StarIcon } from "../icons/StarIcon";
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
                      <p className="w-[26%]">Nama</p>
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
                              onClick={() => {
                                alert(subm.submId);
                              }}
                              className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                                submSaving.length === index + 1 && "rounded-b-2xl"
                              }`}
                            >
                              <div className="flex items-center gap-x-2 col-span-2 w-[26%] ">
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
                      <p className="w-[23%]">Nama</p>
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
                              onClick={() => {
                                alert(subm.submId);
                              }}
                              className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                                submLoan.length === index + 1 && "rounded-b-2xl"
                              }`}
                            >
                              <div className="flex items-center gap-x-2 col-span-2 w-[23%] ">
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
  UserLoanDetail,
  AdminSummary,
  AdminSubmission,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { Panel };
