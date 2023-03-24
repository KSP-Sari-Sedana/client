import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Tab, RadioGroup } from "@headlessui/react";

import { Badge } from "./Badge";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { Card } from "./Card";
import { Product as ProductPreview } from "./Product";
import { RadioText } from "./Radio";
import { Spinner } from "./Spinner";
import { StarIcon } from "../icons/StarIcon";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { WarningIcon } from "../icons/WarningIcon";
import { UpsssArt } from "../art/UpsssArt";
import { useSubmContext } from "../../context/submContext";
import { useUserContext } from "../../context/userContext";
import { useProductContext } from "../../context/productContext";
import { useHelperContext } from "../../context/helperContext";
import { useTransContext } from "../../context/transContext";
import { useSummaryContext } from "../../context/summaryContext";
import { useAccContext } from "../../context/accContext";

const typeAvailable = ["Simpanan", "Pinjaman"];
const depositAvailable = ["Bulanan", "Harian", "Sekali"];
const statusAvailable = ["Publik", "Nonaktif", "Wajib"];
const availableRole = ["Admin", "Teller", "Anggota", "Warga"];
const availableStatus = ["Aktif", "Nonaktif", "Ditinjau"];
const availableStatusSubmission = ["Ditinjau", "Diterima", "Ditolak"];
const availableAccStatus = ["Berjalan", "Selesai"];

function Summary() {
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { summCtx } = useSummaryContext();

  useEffect(() => {
    getSummary();
  }, []);

  async function getSummary() {
    setSummary(await summCtx.getSummaryByAdmin());
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading ? (
        <Spinner text="Loading" className="text-slate-700 place-content-center" />
      ) : (
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-3 place-self-stretch min-w-max text-sm">
            <Link to="/dashboard/admin/user" className="bg-white border rounded-xl px-4 py-3 flex items-center gap-x-3 grow">
              <div className="grow gap-x-2 flex items-center justify-between">
                <div className="flex items-center -space-x-4">
                  <img className="w-8 h-8 rounded-full" src="/assets/profile-picture-bagus.svg" alt="" />
                  <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rama.svg" alt="" />
                  <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rizky.svg" alt="" />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.user.totalUser}</p>
                  <p className="font-medium">Pengguna</p>
                </div>
                <div>
                  <ArrowIcon.Dart aim="rightTop" />
                </div>
              </div>
            </Link>
            <div className="bg-white border rounded-xl px-4 py-3 flex items-center gap-x-3 grow">
              <div className="grow gap-x-2 flex items-center justify-around">
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.status.totalAktif}</p>
                  <Badge style="clear">Aktif</Badge>
                </div>
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.status.totalNonaktif}</p>
                  <Badge style="pippin">Nonaktif</Badge>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-xl px-4 py-3 flex items-center gap-x-3">
              <div className="grow flex gap-x-2 items-center justify-around">
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.role.totalAdmin}</p>
                  <Badge style="gray">
                    <StarIcon role="Admin" />
                    Admin
                  </Badge>
                </div>
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.role.totalTeller}</p>
                  <Badge style="gray">
                    <StarIcon role="Teller" />
                    Teller
                  </Badge>
                </div>
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.role.totalAnggota}</p>
                  <Badge style="gray">
                    <StarIcon role="Anggota" />
                    Anggota
                  </Badge>
                </div>
                <div className="flex flex-col gap-y-1 items-center">
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4">{summary.role.totalWarga}</p>
                  <Badge style="gray">
                    <StarIcon role="Warga" />
                    Warga
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="bg-white border rounded-xl px-4 py-3 w-3/5">
              <p className="text-center mb-2 text-sm font-medium">Saldo Koperasi</p>
              <div className="flex items-center gap-x-3 justify-around">
                <div className="px-3 py-2 border-dashed border-2 rounded-xl">
                  <p className="text-sm font-sourcecodepro text-gray-600">Simpanan</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 text-clear-600">Rp. {summary.balance.totalSavingBalance.toLocaleString("ID-id")}</p>
                </div>
                <div className="px-3 py-2 border-dashed border-2 rounded-xl">
                  <p className="text-sm font-sourcecodepro text-gray-600">Pinjaman</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 text-clear-600">Rp. {summary.balance.totalLoanBalance.toLocaleString("ID-id")}</p>
                </div>
                <div className="px-3 py-2 border-dashed border-2 rounded-xl">
                  <p className="text-sm font-sourcecodepro text-gray-600">Total</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 text-clear-600">Rp. {summary.balance.totalBalance.toLocaleString("ID-id")}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-xl px-4 py-3 w-2/5">
              <p className="text-center mb-2 text-sm font-medium">Total Transaksi</p>
              <div className="flex items-center gap-x-3 justify-around">
                <div className="px-3 py-2 border-dashed border-2 rounded-xl">
                  <p className="text-sm font-sourcecodepro text-gray-600">Kemarin</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 text-clear-600">Rp. {summary.transaction.totalTransYesterday.toLocaleString("ID-id")}</p>
                </div>
                <div className="px-3 py-2 border-dashed border-2 rounded-xl">
                  <p className="text-sm font-sourcecodepro text-gray-600">Hari Ini</p>
                  <p className="font-darkergrotesque text-lg font-extrabold leading-4 text-clear-600">Rp. {summary.transaction.totalTransToday.toLocaleString("ID-id")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Submission() {
  const [isLoading, setIsLoading] = useState(true);
  const [submSaving, setSubmSaving] = useState([]);
  const [submLoan, setSubmLoan] = useState([]);
  const { submCtx } = useSubmContext();
  const [selectedStatus, setSelectedStatus] = useState(availableStatusSubmission[0]);

  useEffect(() => {
    getSubmSaving();
  }, [selectedStatus]);

  async function getSubmSaving() {
    setSubmSaving(await submCtx.get("saving", selectedStatus));
    setSubmLoan(await submCtx.get("loan", selectedStatus));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Semua Pengajuan</p>
      <Tab.Group>
        <div className="flex items-center text-sm mb-3 ml-3 gap-x-2">
          <div className="flex items-center">
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
                    ? "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-magenta-500 bg-magenta-50"
                    : "text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit text-gray-700 bg-gray-100"
                }
              >
                Pinjaman
              </Tab>
            </Tab.List>
          </div>
          <div>
            <RadioGroup value={selectedStatus} onChange={setSelectedStatus}>
              <div className="flex items-center gap-x-2">
                <p>Status: </p>
                {availableStatusSubmission.map((status, index) => (
                  <RadioGroup.Option key={index} value={status} as={Fragment}>
                    {({ checked }) => (
                      <div>
                        <Badge className="cursor-pointer" style={checked ? `${selectedStatus === "Ditinjau" ? "buttercup" : `${selectedStatus === "Diterima" ? "rice" : "pippin"}`}` : "gray"}>
                          {status}
                        </Badge>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
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
                      <div className="h-96 overflow-scroll">
                        {submSaving.length === 0 ? (
                          <div className="flex items-center justify-center h-full">
                            <div>
                              <UpsssArt />
                              <p className="text-center">
                                {`Pengajuan dengan status ${selectedStatus.toLocaleLowerCase()}`} <br /> tidak ditemukan
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {submSaving.map((subm, index) => {
                              return (
                                <Link key={index} to={`saving/${subm.submId}`} className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer`}>
                                  <div className="flex items-center gap-x-2 col-span-2 w-[37%] ">
                                    <div>
                                      <Avatar dimension="w-7 h-7" src={subm.image || "https://source.boringavatars.com/pixel/120?square"} />
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
                      <div className="h-96 overflow-scroll">
                        {submLoan.map((subm, index) => {
                          return (
                            <Link key={index} to={`loan/${subm.submId}`} className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer`}>
                              <div className="flex items-center gap-x-2 col-span-2 w-[37%] ">
                                <div>
                                  <Avatar dimension="w-7 h-7" src={subm.image || "https://source.boringavatars.com/pixel/120?square"} />
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
                    <ArrowIcon.Dart aim="rightTop" />
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
                  <ArrowIcon.Dart aim="rightTop" />
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
  const [isLoadingGetTrans, setIsLoadingGetTrans] = useState(false);
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
  }, [username]);

  useEffect(() => {
    getLastTransaction();
  }, []);

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
    setIsLoadingGetTrans(true);
    setTrans(await transCtx.get(6));
    setIsLoadingGetTrans(false);
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
    getTransactionDetail();
  }

  return (
    <div className="text-sm">
      <div className="min-w-max">
        <div className="flex gap-x-7">
          <div className="w-[35%]">
            <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Transaksi Terakhir</p>
            <div>
              {isLoadingGetTrans ? (
                <Spinner text="Mengambil transaksi terakhir" className="text-slate-700 place-content-center mb-2" />
              ) : (
                <ol className="relative border-l border-zinc-300 ml-2">
                  {trans?.map((tran, index) => (
                    <li className="mb-3 ml-4" key={index}>
                      <div className="absolute w-3 h-3 bg-sky-600 rounded-full mt-1.5 -left-1.5"></div>
                      {index === 0 && <div className="absolute animate-ping w-3 h-3 bg-sky-600 rounded-full mt-1.5 -left-1.5"></div>}
                      <time className="mb-1 font-normal leading-none text-gray-400 font-sourcecodepro tracking-tighter">{helpCtx.getFullDate(tran.transDate)}</time>
                      <div className="flex items-center gap-x-4 justify-between">
                        <div className="flex items-center gap-x-2 col-span-2">
                          <div>
                            <Avatar dimension="w-7 h-7" src={tran.image || "https://source.boringavatars.com/pixel/120?square"} />
                          </div>
                          <div>
                            <p className="leading-none font-medium">{tran.name}</p>
                            <div className="flex items-center">
                              <StarIcon role={tran.role} />
                              <p className="font-sourcecodepro text-xs text-gray-600">{tran.role}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm border-dashed border-2 px-2 py-1 rounded-md">
                          <p className="font-sourcecodepro font-medium">{helpCtx.formatAccNumber(tran.accNumber)}</p>
                          <p className="text-xs font-medium">{helpCtx.formatRupiah(tran.total)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
          <div className="grow">
            <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Tambah Transaksi</p>
            <div className="overflow-hidden border rounded-2xl p-4 w-full">
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
                    <Fragment>
                      {userCtx.me.username === user.username ? (
                        <div className="border mt-4 rounded-xl bg-white p-3 flex flex-col items-center justify-center">
                          <div className="text-bethlehem-500">
                            <WarningIcon.Triangle />
                          </div>
                          <p>Anda tidak bisa melakukan transaksi</p>
                          <p>pada produk yang anda nikmati</p>
                        </div>
                      ) : (
                        <div>
                          <p className="ml-2 mb-3 font-medium">
                            Pilih produk yang dinikmati oleh {user.firstName} {user.lastName}
                          </p>
                          <div>
                            <RadioGroup value={selectedProduct} onChange={setSelectedProduct}>
                              <div className="grid grid-cols-3 gap-3 min-w-max">
                                {consumedProducts.map((product, index) => {
                                  return (
                                    <div key={index}>
                                      <RadioGroup.Option key={product.id} value={product.id}>
                                        {({ checked }) => (
                                          <div>
                                            <div className={`border-2 rounded-xl cursor-pointer ${checked ? "border-clear-500" : "bg-white"} text-sm leading-4 flex items-center py-2 px-3`}>
                                              <div className="grow">
                                                <div className="flex-col">
                                                  <p className="font-sourcecodepro text-sm font-extrabold leading-4">{product.productName}</p>
                                                  <p className="font-sourcecodepro font-semibold leading-4 text-gray-500">{helpCtx.formatAccNumber(product.accNumber)}</p>
                                                  <p
                                                    className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${
                                                      product.productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"
                                                    }`}
                                                  >
                                                    {product.loanBalance?.toLocaleString("ID-id") || product.balance?.toLocaleString("ID-id")}
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
                          {consumedProducts[selectedProduct].status === "Selesai" ? (
                            <Fragment>
                              <div className="border mt-4 rounded-xl bg-white p-3 flex flex-col items-center justify-center">
                                <div className="text-bethlehem-500">
                                  <WarningIcon.Triangle />
                                </div>
                                <p>Status angsuran pada rekening ini telah selesai.</p>
                                <p>
                                  Jika terjadi kesalahan,{" "}
                                  <Link to={`/dashboard/admin/user/${user.username}`} className="text-clear-500 hover:text-clear-600">
                                    ubah disini.
                                  </Link>
                                </p>
                              </div>
                            </Fragment>
                          ) : (
                            <Fragment>
                              {consumedProducts[selectedProduct].productType === "Simpanan" && (
                                <div className="mt-4">
                                  <div>
                                    <p className="mb-2 ml-2 font-medium">Sandi</p>
                                    <RadioText data={codeAvailable} value={code} onChange={setCode} />
                                  </div>
                                  <div className="mt-3">
                                    <p className="mb-1 ml-2 font-medium">Jumlah {code}</p>
                                    <div className="flex w-44">
                                      <Input icon="currency" placeHolder="200.000" action={setSaveInst} />
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
                                    <div className="w-40">
                                      <p className="mb-1 ml-2 font-medium">Pokok</p>
                                      <Input icon="currency" placeHolder="200.000" action={setPrincipal} />
                                    </div>
                                    <div className="w-40">
                                      <p className="mb-1 ml-2 font-medium">Bunga</p>
                                      <Input icon="currency" placeHolder="200.000" action={setInterest} />
                                    </div>
                                    <div className="w-40">
                                      <p className="mb-1 ml-2 font-medium">Denda</p>
                                      <Input icon="currency" placeHolder="200.000" action={setOverdueFee} />
                                    </div>
                                  </div>
                                  <div className="flex">
                                    <Button
                                      action={() => {
                                        if (principal > 0) setConfLoan(true);
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
                            </Fragment>
                          )}
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Product() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [interest, setInterest] = useState(0);
  const [type, setType] = useState(typeAvailable[0]);
  const [deposit, setDeposit] = useState(depositAvailable[0]);
  const [tenor, setTenor] = useState([]);
  const [tenorCounter, setTenorCounter] = useState(0);
  const [installment, setInstallment] = useState([]);
  const [installmentCounter, setInstallmentCounter] = useState(0);
  const [status, setStatus] = useState(statusAvailable[0]);
  const [newProduct, setNewProduct] = useState({});
  const [APIMessage, setAPIMessage] = useState("");

  const { prodCtx } = useProductContext();

  useEffect(() => {
    setNewProduct({
      name,
      image,
      description,
      interest: interest.toFixed(1),
      type,
      deposit,
      tenor,
      installment,
    });

    getProducts();
  }, [name, image, description, interest, type, deposit, tenor, installment]);

  async function getProducts() {
    const response = await prodCtx.getProducts();
    setProducts(response);
  }

  function setAvailableTenor(tenorCounter) {
    if (tenorCounter <= 0) {
      return;
    }

    let temp = tenor;
    temp.push(tenorCounter);

    temp = [...new Set(tenor)].sort(function (a, b) {
      return a - b;
    });

    setTenor(temp);
  }

  function removeAvailableTenor(num) {
    let temp = tenor;

    temp = temp.filter(function (item) {
      return item !== num;
    });

    temp.sort(function (a, b) {
      return a - b;
    });

    setTenor(temp);
  }

  function setAvailableInstallment(installmentCounter) {
    if (installmentCounter <= 0) {
      return;
    }

    let temp = installment;
    temp.push(installmentCounter);

    temp = [...new Set(installment)].sort(function (a, b) {
      return a - b;
    });

    setInstallment(temp);
  }

  function removeAvailableInstallment(num) {
    let temp = installment;

    temp = temp.filter(function (item) {
      return item !== num;
    });

    temp.sort(function (a, b) {
      return a - b;
    });

    setInstallment(temp);
  }

  function handleImageChange(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {};
  }

  async function addProduct() {
    let temp = interest;
    temp = temp.toFixed(1);
    temp = parseFloat(temp);

    const payload = {
      name: name.toUpperCase(),
      image,
      description,
      interest: temp,
      type,
      deposit,
      tenor: deposit === "Sekali" ? [] : tenor,
      installment: type === "Pinjaman" ? [] : installment,
      status,
    };

    const result = await prodCtx.create(payload);
    setAPIMessage(result.message);

    if (result.status === "OK") {
      setIsAddProduct(false);
      setAPIMessage("");
      setName("");
      setImage(null);
      setDescription("");
      setInterest(0);
      setType(typeAvailable[0]);
      setDeposit(depositAvailable[0]);
      setTenor([]);
      setInstallment([]);
      setStatus(statusAvailable[0]);

      getProducts();
    }
  }

  function cancelAddProduct() {
    setAPIMessage("");
    setName("");
    setImage(null);
    setDescription("");
    setInterest(0);
    setType(typeAvailable[0]);
    setDeposit(depositAvailable[0]);
    setTenor([]);
    setInstallment([]);
    setStatus(statusAvailable[0]);
  }

  function deleteImage() {
    setImage(null);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Produk</p>
      <div className="flex">
        <Button
          action={() => {
            setIsAddProduct(true);
          }}
          text="Tambah produk"
          style="cheerful"
          round="rounded-full"
          height="py-1"
          width="px-4"
        ></Button>
        <Modal.Confirm className="pt-2 pb-1" show={isAddProduct} onClose={setIsAddProduct}>
          <div>
            {APIMessage && (
              <div className="relative font-light">
                <div className="absolute inset-0 -top-16 animate-toast flex justify-center">
                  <p className="bg-gray-700 text-sm absolute px-4 py-1 text-white rounded-full max-w-fit">{APIMessage}</p>
                </div>
              </div>
            )}
            <div className="flex gap-x-4">
              <div>
                <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Pertinjauan</p>
                <ProductPreview product={newProduct}>
                  <input
                    className="w-full border bg-red-500 h-full cursor-pointer opacity-0 absolute top-0 left-0 z-10"
                    onChange={(event) => {
                      handleImageChange(event.target.files[0]);
                    }}
                    type="file"
                  />
                </ProductPreview>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-x-3 text-sm">
                  <Input action={setName} label="Nama Produk" placeHolder="Nama Produk" />
                  <div>
                    <p className="mb-2">Tipe</p>
                    <RadioText data={typeAvailable} value={type} onChange={setType} />
                  </div>
                  <div>
                    <p className="mb-2">Bunga</p>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Button
                        action={() => {
                          if (interest < 0.1) return;
                          setInterest(interest - 0.1);
                        }}
                        text="-"
                        style="light"
                        round="rounded-sm"
                        height="py-1"
                        width="px-2"
                      ></Button>
                      <p>{interest.toFixed(1)}</p>
                      <Button
                        action={() => {
                          setInterest(interest + 0.1);
                        }}
                        text="+"
                        style="light"
                        round="rounded-sm"
                        height="py-1"
                        width="px-2"
                      ></Button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2">Setoran</p>
                    <RadioText data={depositAvailable} value={deposit} onChange={setDeposit} />
                  </div>
                  <div className="mt-4">
                    <p className="mb-2">Tenor (bulan)</p>
                    <div className="border p-2 rounded-lg">
                      {deposit !== "Sekali" ? (
                        <div>
                          <div className="grid grid-cols-4 gap-2">
                            {tenor.map((value, index) => (
                              <div key={index} className="bg-magenta-50 px-[6px] py-[2px] rounded-md flex items-center justify-around">
                                <p className="w-full text-magenta-600">{value}</p>
                                <span
                                  onClick={() => {
                                    removeAvailableTenor(value);
                                  }}
                                  className="text-magenta-600 hover:text-magenta-700 cursor-pointer"
                                >
                                  ×
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={`flex items-center gap-x-2 ${tenor.length > 0 && "mt-3"}`}>
                            <Button
                              action={() => {
                                if (tenorCounter < 1) return;
                                setTenorCounter(tenorCounter - 1);
                              }}
                              text="-"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                            <p>{tenorCounter}</p>
                            <Button
                              action={() => {
                                setTenorCounter(tenorCounter + 1);
                              }}
                              text="+"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                            <Button
                              action={() => {
                                setAvailableTenor(tenorCounter);
                              }}
                              text="Tambah"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-bethlehem-800">Tenor tidak bisa diset </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-y-5">
                    <div>
                      <p className="mb-2">Status</p>
                      <RadioText data={statusAvailable} value={status} onChange={setStatus} />
                    </div>
                    <div>
                      <p className="mb-2">Foto</p>
                      <div className="flex">
                        <div
                          onClick={() => {
                            deleteImage();
                          }}
                          className="flex items-center gap-x-2 hover:text-bethlehem-800 text-bethlehem-600 bg-bethlehem-50 px-2 py-1 rounded-md hover:bg-bethlehem-100 cursor-pointer"
                        >
                          <TrashIcon />
                          <p>Hapus foto</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mb-2 mt-3">Angsuran</p>
                  <div className="border p-2 rounded-lg">
                    {type === "Pinjaman" ? (
                      <div>
                        <p className="text-bethlehem-800">Angsuran tidak bisa diset </p>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-5 gap-2">
                          {installment.map((value, index) => (
                            <div key={index} className="bg-rice-50 px-[6px] py-[2px] rounded-md flex items-center justify-around">
                              <p className="w-full text-rice-600">{value.toLocaleString("ID-id")}</p>
                              <span
                                onClick={() => {
                                  removeAvailableInstallment(value);
                                }}
                                className="text-rice-600 hover:text-rice-700 cursor-pointer"
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className={`flex items-center gap-x-2 ${installment.length > 0 && "mt-3"}`}>
                          <Button
                            action={() => {
                              if (installmentCounter < 5000) return;
                              setInstallmentCounter(installmentCounter - 5000);
                            }}
                            text="-"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                          <p>{installmentCounter.toLocaleString("ID-id")}</p>
                          <Button
                            action={() => {
                              setInstallmentCounter(installmentCounter + 5000);
                            }}
                            text="+"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                          <Button
                            action={() => {
                              setAvailableInstallment(installmentCounter);
                            }}
                            text="Tambah"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mb-2 mt-3">Deskripsi</p>
                  <textarea
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    className="border resize-none px-4 py-2 focus:outline-none border-gray-300 w-full rounded-lg"
                    defaultValue=""
                    placeholder="Deskripsi"
                    cols="20"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-content-center mt-5 gap-x-3">
            <Button
              action={() => {
                addProduct();
              }}
              text="Tambah"
              style="electron"
              round="rounded-full"
              height="py-1"
              width="px-4"
            ></Button>
            <Button
              action={() => {
                setIsAddProduct(false);
                cancelAddProduct();
              }}
              text="Batal"
              style="light"
              round="rounded-full"
              height="py-1"
              width="px-4"
            ></Button>
          </div>
        </Modal.Confirm>
      </div>
      <div className="grid grid-cols-5 min-w-max mt-4 gap-4">
        {products.map((product, index) => (
          <div key={index}>
            <Card.TinyProduct productName={product.name} status={product.status} image={product.image} id={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [productTemp, setProductTemp] = useState({});

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [interest, setInterest] = useState(0);
  const [type, setType] = useState(typeAvailable[0]);
  const [deposit, setDeposit] = useState(depositAvailable[0]);
  const [tenor, setTenor] = useState([]);
  const [tenorCounter, setTenorCounter] = useState(0);
  const [installment, setInstallment] = useState([]);
  const [installmentCounter, setInstallmentCounter] = useState(0);
  const [status, setStatus] = useState(statusAvailable[0]);

  const [isLoading, setIsLoading] = useState(true);
  const [APIMessage, setAPIMessage] = useState("");

  const { id } = useParams();
  const { prodCtx } = useProductContext();

  useEffect(() => {
    if (Object.keys(product).length === 0) getById();

    setProductTemp((prev) => {
      return {
        ...prev,
        name,
        image,
        description,
        interest: interest?.toFixed(1),
        type,
        deposit,
        tenor,
        installment,
        status,
      };
    });
  }, [name, image, description, interest, type, deposit, tenor, installment, status]);

  async function getById() {
    setIsLoading(true);

    const response = await prodCtx.getById(id);
    setProduct(response);
    setProductTemp(response);

    setName(response.name);
    setImage(response.image);
    setDescription(response.description);
    setInterest(response.interest);
    setType(response.type);
    setDeposit(response.deposit);
    setTenor(response.tenor);
    setInstallment(response.installment);
    setStatus(response.status);

    setIsLoading(false);
  }

  function setAvailableTenor(tenorCounter) {
    if (tenorCounter <= 0) {
      return;
    }

    let temp = tenor;
    temp.push(tenorCounter);

    temp = [...new Set(tenor)].sort(function (a, b) {
      return a - b;
    });

    setTenor(temp);
  }

  function removeAvailableTenor(num) {
    let temp = tenor;

    temp = temp.filter(function (item) {
      return item !== num;
    });

    temp.sort(function (a, b) {
      return a - b;
    });

    setTenor(temp);
  }

  function setAvailableInstallment(installmentCounter) {
    if (installmentCounter <= 0) {
      return;
    }

    let temp = installment;
    temp.push(installmentCounter);

    temp = [...new Set(installment)].sort(function (a, b) {
      return a - b;
    });

    setInstallment(temp);
  }

  function removeAvailableInstallment(num) {
    let temp = installment;

    temp = temp.filter(function (item) {
      return item !== num;
    });

    temp.sort(function (a, b) {
      return a - b;
    });

    setInstallment(temp);
  }

  function handleImageChange(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {};
  }

  async function getBase64(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  async function updateProduct() {
    setIsLoading(true);
    const payload = {
      name: name.toLocaleUpperCase(),
      image: image ? await getBase64(image) : null,
      description: description,
      interest: Math.round(interest * 10) / 10,
      type: type,
      deposit: deposit,
      tenor: deposit === "Sekali" ? [] : tenor,
      installment: type === "Pinjaman" ? [] : installment,
      status: status,
    };

    const result = await prodCtx.update(id, payload);
    if (result.status === "OK") {
      await getById();
    }
    setAPIMessage(result.message);
    setIsLoading(false);
  }

  function cancelUpdateProduct() {
    setName(product.name);
    setImage(product.image);
    setDescription(product.description);
    setInterest(product.interest);
    setType(product.type);
    setDeposit(product.deposit);
    setTenor(product.tenor);
    setInstallment(product.installment);
    setStatus(product.status);
    setAPIMessage("");
  }

  function deleteImage() {
    setImage(null);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Detail Produk</p>
      {isLoading ? (
        <Spinner text="Mengambil produk" className="text-slate-700 place-content-center mb-2" />
      ) : (
        <div>
          {APIMessage && (
            <div className="relative font-light">
              <div className="absolute inset-0 -top-20 animate-toast flex justify-center">
                <p className="bg-gray-700 text-sm absolute px-4 py-1 text-white rounded-full max-w-fit">{APIMessage}</p>
              </div>
            </div>
          )}
          <div className="flex gap-x-5 min-w-max">
            <div>
              <ProductPreview product={productTemp}>
                <input
                  className="w-full border bg-red-500 h-full cursor-pointer opacity-0 absolute top-0 left-0 z-10"
                  onChange={(event) => {
                    handleImageChange(event.target.files[0]);
                  }}
                  type="file"
                />
              </ProductPreview>
              <div className="flex ml-3 mt-5 gap-x-3">
                <Button
                  action={() => {
                    updateProduct();
                  }}
                  text="Simpan"
                  isLoading={isLoading}
                  style="electron"
                  round="rounded-full"
                  height="py-1"
                  width="px-4"
                ></Button>
                <Button
                  action={() => {
                    cancelUpdateProduct();
                  }}
                  text="Batal"
                  style="light"
                  round="rounded-full"
                  height="py-1"
                  width="px-4"
                ></Button>
              </div>
            </div>
            <div className="grow">
              <div>
                <div className="grid grid-cols-2 gap-x-3 text-sm">
                  <Input value={name} action={setName} label="Nama Produk" placeHolder="Nama Produk" />
                  <div>
                    <p className="mb-2">Tipe</p>
                    <RadioText data={typeAvailable} value={type} onChange={setType} />
                  </div>
                  <div>
                    <p className="mb-2">Bunga</p>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Button
                        action={() => {
                          if (interest < 0.1) return;
                          setInterest(interest - 0.1);
                        }}
                        text="-"
                        style="light"
                        round="rounded-sm"
                        height="py-1"
                        width="px-2"
                      ></Button>
                      <p>{interest?.toFixed(1)}</p>
                      <Button
                        action={() => {
                          setInterest(interest + 0.1);
                        }}
                        text="+"
                        style="light"
                        round="rounded-sm"
                        height="py-1"
                        width="px-2"
                      ></Button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2">Setoran</p>
                    <RadioText data={depositAvailable} value={deposit} onChange={setDeposit} />
                  </div>
                  <div className="mt-4">
                    <p className="mb-2">Tenor (bulan)</p>
                    <div className="border p-2 rounded-lg">
                      {deposit !== "Sekali" ? (
                        <div>
                          <div className="grid grid-cols-5 gap-2">
                            {tenor.map((value, index) => (
                              <div key={index} className="bg-magenta-50 px-[6px] py-[2px] rounded-md flex items-center justify-around">
                                <p className="w-full text-magenta-600">{value}</p>
                                <span
                                  onClick={() => {
                                    removeAvailableTenor(value);
                                  }}
                                  className="text-magenta-600 hover:text-magenta-700 cursor-pointer"
                                >
                                  ×
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={`flex items-center gap-x-2 ${tenor.length > 0 && "mt-3"}`}>
                            <Button
                              action={() => {
                                if (tenorCounter < 1) return;
                                setTenorCounter(tenorCounter - 1);
                              }}
                              text="-"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                            <p>{tenorCounter}</p>
                            <Button
                              action={() => {
                                setTenorCounter(tenorCounter + 1);
                              }}
                              text="+"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                            <Button
                              action={() => {
                                setAvailableTenor(tenorCounter);
                              }}
                              text="Tambah"
                              style="light"
                              round="rounded-sm"
                              height="py-1"
                              width="px-2"
                            ></Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-bethlehem-800">Tenor tidak bisa diset </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-y-5">
                    <div>
                      <p className="mb-2">Status</p>
                      <RadioText data={statusAvailable} value={status} onChange={setStatus} />
                    </div>
                    <div>
                      <p className="mb-2">Foto</p>
                      <div className="flex">
                        <div
                          onClick={() => {
                            deleteImage();
                          }}
                          className="flex items-center gap-x-2 hover:text-bethlehem-800 text-bethlehem-600 bg-bethlehem-50 px-2 py-1 rounded-md hover:bg-bethlehem-100 cursor-pointer"
                        >
                          <TrashIcon />
                          <p>Hapus foto</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mb-2 mt-3">Angsuran</p>
                  <div className="border p-2 rounded-lg">
                    {type === "Pinjaman" ? (
                      <div>
                        <p className="text-bethlehem-800">Angsuran tidak bisa diset </p>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-5 gap-2">
                          {installment.map((value, index) => (
                            <div key={index} className="bg-rice-50 px-[6px] py-[2px] rounded-md flex items-center justify-around">
                              <p className="w-full text-rice-600">{value.toLocaleString("ID-id")}</p>
                              <span
                                onClick={() => {
                                  removeAvailableInstallment(value);
                                }}
                                className="text-rice-600 hover:text-rice-700 cursor-pointer"
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className={`flex items-center gap-x-2 ${installment.length > 0 && "mt-3"}`}>
                          <Button
                            action={() => {
                              if (installmentCounter < 5000) return;
                              setInstallmentCounter(installmentCounter - 5000);
                            }}
                            text="-"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                          <p>{installmentCounter.toLocaleString("ID-id")}</p>
                          <Button
                            action={() => {
                              setInstallmentCounter(installmentCounter + 5000);
                            }}
                            text="+"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                          <Button
                            action={() => {
                              setAvailableInstallment(installmentCounter);
                            }}
                            text="Tambah"
                            style="light"
                            round="rounded-sm"
                            height="py-1"
                            width="px-2"
                          ></Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mb-2 mt-3">Deskripsi</p>
                  <textarea
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    defaultValue={description}
                    className="border resize-none px-4 py-2 focus:outline-none border-gray-300 w-full rounded-lg"
                    placeholder="Deskripsi"
                    cols="20"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function User() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(availableRole[2]);
  const [selectedStatus, setSelectedStatus] = useState(availableStatus[0]);

  const { userCtx } = useUserContext();

  useEffect(() => {
    get();
  }, [selectedRole, selectedStatus]);

  async function get() {
    setIsLoading(true);
    setUsers(await userCtx.get(selectedStatus, selectedRole));
    setIsLoading(false);
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar Anggota</p>
      <div className="mb-4 text-sm">
        <div className="flex items-center gap-x-2">
          <RadioGroup value={selectedStatus} onChange={setSelectedStatus}>
            <div className="flex items-center gap-x-2">
              <p>status: </p>
              {availableStatus.map((status, index) => (
                <RadioGroup.Option key={index} value={status} as={Fragment}>
                  {({ checked }) => (
                    <div>
                      <Badge className="cursor-pointer" style={checked ? "clear" : "gray"}>
                        {status}
                      </Badge>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={selectedRole} onChange={setSelectedRole}>
            <div className="flex items-center gap-x-2">
              <p>role: </p>
              {availableRole.map((role, index) => (
                <RadioGroup.Option key={index} value={role} as={Fragment}>
                  {({ checked }) => (
                    <div>
                      <Badge className="cursor-pointer" style={checked ? "clear" : "gray"}>
                        <StarIcon role={role} />
                        {role}
                      </Badge>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className=" min-w-max">
        <div className="border rounded-2xl overflow-hidden bg-white text-sm">
          <div className="px-6 py-5 bg-white rounded-t-2xl border-b border-gray-200">
            <div className="flex font-medium">
              <p className="w-[30%]">Nama</p>
              <p className="w-[20%]">Telepon</p>
              <p className="w-[25%]">NIP</p>
              <p className="w-[23%]">Pekerjaan</p>
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
                {users.length === 0 ? (
                  <div className="text-center py-2">
                    <p>User tidak ditemukan</p>
                  </div>
                ) : (
                  <Fragment>
                    {users.map((user, index) => {
                      return (
                        <Link key={index} to={`${user.username}`} className={`flex py-[12px] px-6 items-center hover:bg-gray-50 cursor-pointer`}>
                          <div className="flex items-center gap-x-2 col-span-2 w-[30%] ">
                            <div>
                              <Avatar dimension="w-7 h-7" src={user.image || "https://source.boringavatars.com/pixel/120?square"} />
                            </div>
                            <div>
                              <p className="leading-none font-medium">{`${user.firstName} ${user.lastName}`}</p>
                              <div className="flex items-center">
                                <StarIcon role={user.role} />
                                <p className="font-sourcecodepro text-xs text-gray-600">{user.role}</p>
                              </div>
                            </div>
                          </div>
                          <p className=" w-[20%] font-sourcecodepro font-medium">{user.cellphone}</p>
                          <p className=" w-[25%] font-sourcecodepro font-medium">{user.nin}</p>
                          <p className=" w-[23%] ">{user.job}</p>
                          <div className=" w-[20%] ">
                            <Badge
                              style={
                                user.status === "Aktif" ? "clear" : user.status === "Ditinjau" ? "buttercup" : user.status === "Dikunci" ? "rice" : user.status === "Nonaktif" ? "magenta" : "pippin"
                              }
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </Link>
                      );
                    })}
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDetail() {
  const [user, setUser] = useState({});
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [accStatus, setAccStatus] = useState("");
  const [role, setRole] = useState("");
  const [isModalRoleAndStatusOpen, setIsModalRoleAndStatusOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  const { userCtx } = useUserContext();
  const { helpCtx } = useHelperContext();
  const { prodCtx } = useProductContext();
  const { accCtx } = useAccContext();

  useEffect(() => {
    getByUsername();
  }, []);

  async function getByUsername() {
    setIsLoading(true);
    const user = await userCtx.getByUsername(username);

    const saving = await prodCtx.getConsumedProducts("saving", user.username);
    const loan = await prodCtx.getConsumedProducts("loan", user.username);
    const consumedProducts = [...saving, ...loan];
    setConsumedProducts(consumedProducts);

    for (var i = 0; i < consumedProducts.length; i++) {
      consumedProducts[i].id = i;
      consumedProducts[i].modalKey = false;
      consumedProducts[i].type = consumedProducts[i].productType === "Simpanan" ? "saving" : "loan";
    }

    setUser(user);
    setStatus(user.status);
    setRole(user.role);
    setIsLoading(false);
  }

  async function handleUpdateRoleAndStatus() {
    setIsLoading(true);
    await userCtx.setStatusAndRole(user.username, status, role);
    setIsModalRoleAndStatusOpen(false);
    getByUsername();
  }

  async function handleAccStatus(type, id, status) {
    setIsLoading(true);
    await accCtx.setStatus(type, id, status);
    getByUsername();
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <Spinner text="Loading" className="text-slate-700 place-content-center" />
        </div>
      ) : (
        <div>
          <p className="text-center font-darkergrotesque text-3xl font-extrabold">Profil</p>
          <div className="flex gap-x-8 mt-8">
            <div className="min-w-max">
              <div className="flex flex-col items-center">
                <Avatar src={user.image || "https://source.boringavatars.com/pixel/120?square"}></Avatar>
                <div className="flex mt-3 gap-x-2">
                  <Badge style="clear">
                    <StarIcon role={user.role} />
                    {user.role}
                  </Badge>
                  <Badge style={user.status === "Aktif" ? "clear" : user.status === "Ditinjau" ? "buttercup" : user.status === "Dikunci" ? "rice" : user.status === "Nonaktif" ? "magenta" : "pippin"}>
                    {user.status}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="font-darkergrotesque text-4xl font-extrabold">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-sm text-center mt-1 text-gray-700">{user.email}</p>
                </div>
              </div>
              <div>
                <div>
                  <div className="text-sm mt-4 mb-2">
                    <p className="">Status</p>
                    <div>
                      <RadioText value={status} onChange={setStatus} data={availableStatus}></RadioText>
                    </div>
                  </div>
                  <div className="text-sm mt-4 mb-2">
                    <p className="">Role</p>
                    <div>
                      <RadioText value={role} onChange={setRole} data={availableRole}></RadioText>
                    </div>
                  </div>
                  <div className="flex mt-5 gap-x-3">
                    <Button
                      action={() => {
                        setIsModalRoleAndStatusOpen(true);
                      }}
                      text="Simpan"
                      style="electron"
                      round="rounded-full"
                      height="py-1"
                      width="px-4"
                    ></Button>
                  </div>
                </div>
                <div>
                  <Modal.Confirm show={isModalRoleAndStatusOpen} onClose={setIsModalRoleAndStatusOpen}>
                    <div className="text-sm text-center">
                      <p>Anda yakin ingin mengubah</p>
                      <p>
                        status dan role dari <span>{`${user.firstName} ${user.lastName}`}</span> menjadi:
                      </p>
                      <div className="flex gap-x-3 place-content-center mt-3">
                        <div className="flex flex-col gap-y-2 items-center">
                          <p className="text-gray-500">Status</p>
                          <Badge style={status === "Aktif" ? "clear" : status === "Ditinjau" ? "buttercup" : status === "Dikunci" ? "rice" : status === "Nonaktif" ? "magenta" : "pippin"}>
                            {status}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-y-2 items-center">
                          <p className="text-gray-500">Role</p>
                          <Badge style="clear">
                            <StarIcon role={role} />
                            {role}
                          </Badge>
                        </div>
                      </div>
                      {(role === "Admin" || role === "Teller" || role === "Anggota") && status === "Aktif" && (
                        <div className="mt-4 flex flex-col gap-y-1 items-center border p-2 text-bethlehem-500 border-bethlehem-500 rounded-md">
                          <WarningIcon.Triangle />
                          <div className="text-gray-700">
                            <p>Pastikan telah melakukan pembayaran sebesar Rp. 200.000</p>
                            <p>sebagai modal untuk menjadi anggota koperasi.</p>
                            <p>{`Dan pastikan role yang anda atur sudah benar`}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex mt-4 place-content-center gap-x-2">
                      <Button
                        action={() => {
                          handleUpdateRoleAndStatus();
                        }}
                        text="Ya"
                        style="electron"
                        round="rounded-full"
                        height="py-1"
                        width="px-4"
                      ></Button>
                      <Button
                        action={() => {
                          setIsModalRoleAndStatusOpen(false);
                        }}
                        text="Batal"
                        style="light"
                        round="rounded-full"
                        height="py-1"
                        width="px-4"
                      ></Button>
                    </div>
                  </Modal.Confirm>
                </div>
              </div>
            </div>
            <div className="grow min-w-max overflow-hidden">
              <div>
                <p className="text-sm ml-3 mb-2">Informasi</p>
                <div className="text-sm grid grid-cols-3 text-center border rounded-2xl overflow-hidden">
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">Username</p>
                    <p className="text-gray-900">{user.username}</p>
                  </div>
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">Telepon</p>
                    <p className="text-gray-900">{user.cellphone || "-"}</p>
                  </div>
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">NIP</p>
                    <p className="text-gray-900">{user.nin || "-"}</p>
                  </div>
                  <div className="bg-gray-50 py-3 px-3">
                    <p className="text-gray-500">Pekerjaan</p>
                    <p className="text-gray-900">{user.job || "-"}</p>
                  </div>
                  <div className="bg-gray-50 py-3 px-3">
                    <p className="text-gray-500">Gaji</p>
                    <p className="text-gray-900">{helpCtx.formatRupiah(user.salary || 0)}</p>
                  </div>
                  <div className="bg-gray-50 py-3 px-3">
                    <p className="text-gray-500">Pengeluaran</p>
                    <p className="text-gray-900">{helpCtx.formatRupiah(user.expense || 0)}</p>
                  </div>
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">Provinsi</p>
                    <p className="text-gray-900">{user.province || "-"}</p>
                  </div>
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">Kabupaten</p>
                    <p className="text-gray-900">{user.district || "-"}</p>
                  </div>
                  <div className="bg-white py-3 px-3">
                    <p className="text-gray-500">Kecamatan</p>
                    <p className="text-gray-900">{user.subdistrict || "-"}</p>
                  </div>
                </div>
                {consumedProducts.length > 0 && (
                  <div>
                    <p className="text-sm ml-3 mb-2 mt-3">Produk yang dinikmati</p>
                    <div>
                      <div className="grid grid-cols-3 gap-2">
                        {consumedProducts.map((product, index) => (
                          <div key={index} className={`border rounded-xl cursor-pointer h-20 text-sm leading-4 flex items-center hover:bg-gray-50`}>
                            <div
                              className="grow py-6 px-5"
                              onClick={() => {
                                setAccStatus(product.status);
                                product.modalKey = true;
                                setConsumedProducts([...consumedProducts]);
                              }}
                            >
                              <div className="flex-col">
                                <p className="font-sourcecodepro text-sm font-extrabold leading-4">{product.productName}</p>
                                <p className="font-sourcecodepro font-semibold leading-4">{helpCtx.formatAccNumber(product.accNumber)}</p>
                                <p className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${product.productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"}`}>
                                  Rp. {product.loanBalance?.toLocaleString("ID-id") || product.balance?.toLocaleString("ID-id")}
                                </p>
                              </div>
                            </div>
                            <Modal.Confirm
                              show={product.modalKey}
                              onClose={() => {
                                setConsumedProducts(
                                  consumedProducts.map((item) => {
                                    if (item.id === product.id) {
                                      item.modalKey = false;
                                    }
                                    return item;
                                  })
                                );
                              }}
                            >
                              <div className="flex flex-col place-items-center gap-y-3 text-sm">
                                <div className="text-center">
                                  <p className="font-sourcecodepro text-xl font-extrabold leading-4">{product.productName}</p>
                                  <p className="font-sourcecodepro font-semibold leading-4 text-gray-600">rek: {helpCtx.formatAccNumber(product.accNumber)}</p>
                                  <p className="mt-3 text-gray-500">
                                    Status angsuran pada rekening ini adalah <span className="lowercase">{product.status}</span>
                                  </p>
                                </div>
                                <Badge style={`${product.status === "Berjalan" ? "buttercup" : "clear"}`}>{product.status}</Badge>
                                <div className="flex items-center gap-x-2">
                                  <p>Ubah status: </p>
                                  <RadioText value={accStatus} onChange={setAccStatus} data={availableAccStatus}></RadioText>
                                </div>
                                <div className="flex mt-4 place-content-center gap-x-2">
                                  <Button
                                    action={() => {
                                      handleAccStatus(product.type, product.accId, accStatus);
                                      setConsumedProducts(
                                        consumedProducts.map((item) => {
                                          if (item.id === product.id) {
                                            item.status = accStatus;
                                            item.modalKey = false;
                                          }
                                          return item;
                                        })
                                      );
                                    }}
                                    text="Simpan"
                                    style="electron"
                                    round="rounded-full"
                                    height="py-1"
                                    width="px-4"
                                  ></Button>
                                  <Button
                                    action={() => {
                                      setConsumedProducts(
                                        consumedProducts.map((item) => {
                                          if (item.id === product.id) {
                                            item.modalKey = false;
                                          }
                                          return item;
                                        })
                                      );
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
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Admin = {
  Summary,
  Submission,
  SubmissionDetail,
  Transaction,
  Product,
  ProductDetail,
  User,
  UserDetail,
};

export { Admin };
