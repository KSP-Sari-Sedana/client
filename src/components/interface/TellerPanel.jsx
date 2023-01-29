import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";

import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { RadioText } from "./Radio";
import { Spinner } from "./Spinner";
import { StarIcon } from "../icons/StarIcon";
import { WarningIcon } from "../icons/WarningIcon";
import { useUserContext } from "../../context/userContext";
import { useProductContext } from "../../context/productContext";
import { useHelperContext } from "../../context/helperContext";
import { useTransContext } from "../../context/transContext";

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
    setTrans(await transCtx.get(6));
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
          <div>
            <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Transaksi Terakhir</p>
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
                                <p>Jika terjadi kesalahan, silahkan hubungi Admin.</p>
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

const Teller = {
  Transaction,
};

export { Teller };
