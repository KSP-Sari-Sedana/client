import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Tab, RadioGroup } from "@headlessui/react";

import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { RadioText } from "./Radio";
import { Spinner } from "./Spinner";
import { StarIcon } from "../icons/StarIcon";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import { useSubmContext } from "../../context/submContext";
import { useUserContext } from "../../context/userContext";
import { useProductContext } from "../../context/productContext";
import { useHelperContext } from "../../context/helperContext";
import { useTransContext } from "../../context/transContext";

function Summary() {
  return <div></div>;
}

function Submission() {
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
        <div className="flex items-center text-sm mb-3 ml-3">
          <p>Produk: </p>
          <Tab.List className="flex gap-x-2 ml-2">
            <Tab
              className={({ selected }) =>
                selected
                  ? "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-clear-500 bg-clear-50"
                  : "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-gray-700 bg-gray-100"
              }
            >
              Simpanan
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-clear-500 bg-clear-50"
                  : "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-gray-700 bg-gray-100"
              }
            >
              Pinjaman
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div>
            <Tab.Panel>
              <div className=" min-w-max">
                <div className="border rounded-2xl overflow-hidden bg-white text-sm">
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
                        <Spinner text="Loading" className="text-slate-700 place-content-center" />
                      </div>
                    ) : (
                      <div>
                        {submSaving.map((subm, index) => {
                          return (
                            <Link key={index} to={`saving/${subm.submId}`} className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer`}>
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
              <div className="min-w-max">
                <div className="border rounded-2xl bg-white text-sm overflow-hidden">
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
                        <Spinner text="Loading" className="text-slate-700 place-content-center" />
                      </div>
                    ) : (
                      <div>
                        {submLoan.map((subm, index) => {
                          return (
                            <Link key={index} to={`loan/${subm.submId}`} className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer`}>
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

function SubmissionDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [subm, setSubm] = useState({});
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalAccept, setIsModalAccept] = useState(false);

  const { submCtx } = useSubmContext();
  const { userCtx } = useUserContext();
  const { type, id } = useParams();

  useEffect(() => {
    getSubm();
  }, []);

  async function getSubm() {
    setSubm(await submCtx.getSubmById(id, type));
    setIsLoading(false);
  }

  async function getUser() {
    setUser(await userCtx.getByUsername(subm.username));
  }

  async function updateStatus() {
    const payload = {
      status,
    };
    await submCtx.update(type, subm.submId, payload);
    setIsModalAccept(false);
    setIsModalCancel(false);
    getSubm();
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Pengajuan</p>
          <Spinner text="Loading" className="text-slate-700 place-content-center" />
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
                <div>
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      getUser();
                    }}
                    className="hover:text-clear-700 cursor-pointer"
                  >
                    <ArrowIcon aim="rightTop" />
                  </div>
                  <Modal.Confirm show={isOpen} onClose={setIsOpen}>
                    <div className="text-sm">
                      <p className="text-center font-medium mb-3">Detail Pengaju</p>
                      <hr className="my-3 h-px bg-gray-200 border-0"></hr>
                      <div>
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
                        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mt-3">
                          <span className="text-gray-500">
                            Provinsi : <span className="text-gray-900">{user.province}</span>
                          </span>
                          <span className="text-gray-500">
                            Kabupaten : <span className="text-gray-900">{user.district}</span>
                          </span>
                          <span className="text-gray-500">
                            Kecamatan : <span className="text-gray-900">{user.subdistrict}</span>
                          </span>
                          <span className="text-gray-500">
                            Alamat : <span className="text-gray-900">{user.address}</span>
                          </span>
                          <span className="text-gray-500">
                            NIP : <span className="text-gray-900">{user.nin}</span>
                          </span>
                          <span className="text-gray-500">
                            Pekerjaan : <span className="text-gray-900">{user.job}</span>
                          </span>
                          <span className="text-gray-500">
                            Gaji : <span className="text-gray-900">Rp. {user.salary?.toLocaleString("ID-id")}</span>
                          </span>
                          <span className="text-gray-500">
                            Pengeluaran : <span className="text-gray-900">Rp. {user.expense?.toLocaleString("ID-id")}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Modal.Confirm>
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
          <div className="flex mt-6 gap-x-8">
            <div className="text-sm">
              {subm.status === "Diterima" ? (
                <p className="mb-3">Pengajuan ini sudah diterima</p>
              ) : subm.status === "Ditolak" ? (
                <p className="mb-3">Pengajuan ini sudah ditolak</p>
              ) : (
                <p className="mb-3">Terima pengajuan ini?</p>
              )}
              <div className="flex gap-x-2">
                <Button
                  action={() => {
                    setIsModalAccept(true);
                    setStatus("Diterima");
                  }}
                  isDisable={subm.status === "Diterima" || subm.status === "Ditolak" ? true : false}
                  text="Terima"
                  style="electron"
                  round="rounded-full"
                  height="py-1"
                  width="px-4"
                ></Button>
                <Button
                  action={() => {
                    setIsModalCancel(true);
                    setStatus("Ditolak");
                  }}
                  isDisable={subm.status === "Diterima" || subm.status === "Ditolak" ? true : false}
                  text="Tolak"
                  style="bethlehem"
                  round="rounded-full"
                  height="py-1"
                  width="px-4"
                ></Button>
              </div>
              <Modal.Confirm show={isModalAccept} onClose={setIsModalAccept}>
                <div className="text-sm">
                  <p>Anda yakin ingin menerima?</p>
                  <div className="flex place-content-center mt-3">
                    <Button
                      action={() => {
                        setIsModalAccept(false);
                        updateStatus();
                      }}
                      text="Terima"
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    ></Button>
                  </div>
                </div>
              </Modal.Confirm>
              <Modal.Confirm show={isModalCancel} onClose={setIsModalCancel}>
                <div className="text-sm">
                  <p>Anda yakin ingin menolak?</p>
                  <div className="flex place-content-center mt-3">
                    <Button
                      action={() => {
                        setIsModalCancel(false);
                        updateStatus();
                      }}
                      text="Tolak"
                      style="bethlehem"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    ></Button>
                  </div>
                </div>
              </Modal.Confirm>
            </div>
            <div className="border rounded-2xl bg-white text-sm grow">
              <div className="px-6 py-3 rounded-t-2xl border-b border-gray-200 text-base flex items-center justify-between">
                <div className="text-sm">
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
        </div>
      )}
    </div>
  );
}

function Transaction() {
  const codeAvailable = ["Setoran", "Penarikan", "Bunga", "Administrasi"];
  const [isLoading, setIsLoading] = useState(false);
  const [saveInst, setSaveInst] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [trans, setTrans] = useState([]);
  const [overdueFee, setOverdueFee] = useState(0);
  const [confSaving, setConfSaving] = useState(false);
  const [confLoan, setConfLoan] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [code, setCode] = useState(codeAvailable[0]);
  const { userCtx } = useUserContext();
  const { prodCtx } = useProductContext();
  const { helpCtx } = useHelperContext();
  const { transCtx } = useTransContext();

  useEffect(() => {
    getTransactionDetail();
    getLastTransaction();
  }, [username]);

  async function getTransactionDetail() {
    if (!username) return;

    setIsLoading(true);

    const user = await userCtx.getByUsername(username);
    if (user !== {}) setUser(user);

    if (user.username) {
      const saving = await prodCtx.getConsumedProducts("saving", user.username);
      const loan = await prodCtx.getConsumedProducts("loan", user.username);
      const consumedProducts = [...saving, ...loan];

      for (var i = 0; i < consumedProducts.length; i++) {
        consumedProducts[i].id = i;
      }

      if (consumedProducts.length > 0) {
        setConsumedProducts(consumedProducts);
        setSelectedProduct(consumedProducts[0].id);
      }
    } else {
      setUser({});
      setConsumedProducts([]);
    }

    setIsLoading(false);
  }

  async function getLastTransaction() {
    setTrans(await transCtx.get(3));
  }

  async function submitTransaction() {
    const type = consumedProducts[selectedProduct].productType === "Simpanan" ? "saving" : "loan";
    let payload = {};

    if (type === "saving") {
      payload = {
        code: code,
        funds: saveInst,
      };
    } else if (type === "loan") {
      payload = {
        principal,
        interest,
        overdueFee,
      };
    }

    const res = await transCtx.create(consumedProducts[selectedProduct].accId, type, payload);
    getLastTransaction();
  }

  return (
    <div className="text-sm">
      <div className="min-w-max">
        <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Transaksi Terakhir</p>
        <div className="border rounded-2xl bg-white text-sm overflow-hidden">
          <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
            <div className="flex font-medium">
              <p className="w-[30%]">Nama</p>
              <p className="w-[20%]">Produk</p>
              <p className="w-[20%]">Rekening</p>
              <p className="w-[24%]">Jumlah Transaksi</p>
              <p className="w-[33%]">Tanggal</p>
            </div>
          </div>
          {trans?.map((tran, index) => (
            <div key={index} className={`flex py-[12px] px-6 items-center ${index % 2 === 1 && "bg-gray-50"}`}>
              <div className="flex items-center gap-x-2 col-span-2 w-[30%]">
                <div>
                  <Avatar dimension="w-7 h-7" src={tran.image} />
                </div>
                <div>
                  <p className="leading-none font-medium">{tran.name}</p>
                  <div className="flex items-center">
                    <StarIcon role={tran.role} />
                    <p className="font-sourcecodepro text-xs text-gray-600">{tran.role}</p>
                  </div>
                </div>
              </div>
              <div className="w-[20%] font-sourcecodepro font-bold uppercase">
                <span>{tran.productName}</span>
              </div>
              <p className="w-[20%] font-sourcecodepro font-medium">{helpCtx.formatAccNumber(tran.accNumber)}</p>
              <p className="w-[24%]">{helpCtx.formatRupiah(tran.total)}</p>
              <p className="w-[33%]">{helpCtx.getFullDate(tran.transDate)}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3 mt-4">Tambah Transaksi</p>
      <p className="ml-2 font-medium mb-1">Username</p>
      <div className="flex items-center gap-x-3">
        <Input placeHolder="bagussuprapta" icon="fingerPrint" action={setUsername} />
        {isLoading ? (
          <Spinner text="Mencari pengguna" className="text-slate-700 place-content-center mb-2" />
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
              <p className="ml-2 mb-3 font-medium">
                Pilih produk yang dinikmati oleh {user.firstName} {user.lastName}
              </p>
              <div>
                <RadioGroup value={selectedProduct} onChange={setSelectedProduct}>
                  <div className="grid grid-cols-4 gap-3 min-w-max">
                    {consumedProducts.map((product, index) => {
                      return (
                        <div key={index}>
                          <RadioGroup.Option key={product.id} value={product.id}>
                            {({ checked }) => (
                              <div>
                                <div className={`border-2 rounded-xl cursor-pointer ${checked ? "border-clear-500" : "bg-white"} h-20 text-sm leading-4 flex items-center py-6 px-5`}>
                                  <div className="grow">
                                    <div className="flex-col">
                                      <p className="font-sourcecodepro text-lg font-extrabold leading-4">{product.productName}</p>
                                      <p className="font-sourcecodepro font-semibold leading-4">rek: {helpCtx.formatAccNumber(product.accNumber)}</p>
                                      <p className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${product.productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"}`}>
                                        Rp. {product.loanBalance?.toLocaleString("ID-id") || product.balance?.toLocaleString("ID-id")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </RadioGroup.Option>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
              {consumedProducts[selectedProduct].productType === "Simpanan" && (
                <div className="mt-4">
                  <div>
                    <p className="mb-2 ml-2 font-medium">Sandi</p>
                    <RadioText data={codeAvailable} value={code} onChange={setCode} />
                  </div>
                  <div className="mt-3">
                    <p className="mb-1 ml-2 font-medium">Jumlah {code}</p>
                    <div className="flex w-44">
                      <Input placeHolder="200.000" action={setSaveInst} />
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      action={() => {
                        if (saveInst > 0) setConfSaving(true);
                      }}
                      text={`+ ${code}`}
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    ></Button>
                    <Modal.Confirm show={confSaving} onClose={setConfSaving}>
                      <div className="text-sm">
                        <div className="text-center">
                          <p>
                            {`${code} akan dilakukan pada`} <span className="font-sourcecodepro font-bold">{`${consumedProducts[selectedProduct].productName}`}</span>
                          </p>
                          <p>
                            <span className="font-sourcecodepro font-semibold leading-4">rek: {helpCtx.formatAccNumber(consumedProducts[selectedProduct].accNumber)}.</span>
                            <span>
                              {" "}
                              Atas nama <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                            </span>
                          </p>
                          <p>
                            dengan total <span className="lowercase">{code}</span>
                            {` ${helpCtx.formatRupiah(saveInst)}`}
                          </p>
                        </div>
                        <div className="flex mt-4 place-content-center gap-x-2">
                          <Button
                            action={() => {
                              submitTransaction();
                              setConfSaving(false);
                            }}
                            text="Proses"
                            style="electron"
                            round="rounded-full"
                            height="py-1"
                            width="px-4"
                          ></Button>
                          <Button
                            action={() => {
                              setConfSaving(false);
                            }}
                            text="Batal"
                            style="light"
                            round="rounded-full"
                            height="py-1"
                            width="px-4"
                          ></Button>
                        </div>
                      </div>
                    </Modal.Confirm>
                  </div>
                </div>
              )}
              {consumedProducts[selectedProduct].productType === "Pinjaman" && (
                <div className="mt-4">
                  <div className="flex gap-x-4">
                    <div className="w-44">
                      <p className="mb-1 ml-2 font-medium">Pokok</p>
                      <Input placeHolder="200.000" action={setPrincipal} />
                    </div>
                    <div className="w-44">
                      <p className="mb-1 ml-2 font-medium">Bunga</p>
                      <Input placeHolder="200.000" action={setInterest} />
                    </div>
                    <div className="w-44">
                      <p className="mb-1 ml-2 font-medium">Denda</p>
                      <Input placeHolder="200.000" action={setOverdueFee} />
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      action={() => {
                        setConfLoan(true);
                      }}
                      text="Proses"
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    ></Button>
                  </div>
                  <Modal.Confirm show={confLoan} onClose={setConfLoan}>
                    <div className="text-sm">
                      <div className="text-center">
                        <p>
                          {`Transaksi akan dilakukan pada`} <span className="font-sourcecodepro font-bold">{`${consumedProducts[selectedProduct].productName}`}</span>
                        </p>
                        <p>
                          <span className="font-sourcecodepro font-semibold leading-4">rek: {helpCtx.formatAccNumber(consumedProducts[selectedProduct].accNumber)}.</span>
                          <span>
                            {" "}
                            Atas nama <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                          </span>
                        </p>
                        <div>
                          <p>dengan rincian</p>
                          <div className="flex justify-around gap-x-4 mt-3">
                            <p className="text-gray-500">
                              Pokok : <span className="text-gray-800">{helpCtx.formatRupiah(principal)}</span>
                            </p>
                            <p className="text-gray-500">
                              Bunga : <span className="text-gray-800">{helpCtx.formatRupiah(interest)}</span>
                            </p>
                            <p className="text-gray-500">
                              Denda : <span className="text-gray-800">{helpCtx.formatRupiah(overdueFee)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 place-content-center gap-x-2">
                        <Button
                          action={() => {
                            submitTransaction();
                            setConfLoan(false);
                          }}
                          text="Proses"
                          style="electron"
                          round="rounded-full"
                          height="py-1"
                          width="px-4"
                        ></Button>
                        <Button
                          action={() => {
                            setConfLoan(false);
                          }}
                          text="Batal"
                          style="light"
                          round="rounded-full"
                          height="py-1"
                          width="px-4"
                        ></Button>
                      </div>
                    </div>
                  </Modal.Confirm>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Product() {
  return <div></div>;
}

function User() {
  return <div></div>;
}

const Admin = {
  Summary,
  Submission,
  SubmissionDetail,
  Transaction,
  Product,
  User,
};

export { Admin };
