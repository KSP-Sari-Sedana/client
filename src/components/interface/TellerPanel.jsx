import { useState, useEffect, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";

import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { RadioText } from "./Radio";
import { Spinner } from "./Spinner";
import { StarIcon } from "../icons/StarIcon";
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

const Teller = {
  Transaction,
};

export { Teller };
