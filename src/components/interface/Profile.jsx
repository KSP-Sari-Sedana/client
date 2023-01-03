import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { Input } from "../interface/Input";
import { Button } from "../interface/Button";
import { ProvinceIcon } from "../icons/ProvinceIcon";
import { DistrictIcon } from "../icons/DistrictIcon";
import { SubdistrictIcon } from "../icons/SubdistrictIcon";
import { useUserContext } from "../../context/userContext";

const province = ["Bali"];
const district = ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan", "Denpasar"];

const badung = ["Abiansemal", "Kuta", "Kuta Selatan", "Kuta Utara", "Mengwi", "Petang"];
const bangli = ["Bangli", "Kintamani", "Susut", "Tembuku"];
const buleleng = ["Banjar", "Buleleng", "Busungbiu", "Gerokgak", "Kubutambahan", "Sawan", "Seririt", "Sukasada", "Tejakula"];
const gianyar = ["Blahbatuh", "Gianyar", "Payangan", "Sukawati", "Tampaksiring", "Tegalalang", "Ubud"];
const jembrana = ["Jembrana", "Melaya", "Mendoyo", "Negara", "Pekutatan"];
const karangasem = ["Abang", "Bebandem", "Karangasem", "Kubu", "Manggis", "Rendang", "Selat", "Sidemen"];
const klungkung = ["Banjarangkan", "Dawan", "Klungkung", "Nusapenida"];
const tabanan = ["Baturiti", "Kediri", "Kerambitan", "Marga", "Penebel", "Pupuan", "Selemadeg", "Selemadeg Barat", "Selemadeg Timur", "Tabanan"];
const denpasar = ["Denpasar Barat", "Denpasar Selatan", "Denpasar Timur", "Denpasar Utara"];
const subdistrict = [...badung, ...bangli, ...buleleng, ...gianyar, ...jembrana, ...karangasem, ...klungkung, ...tabanan, ...denpasar];

function Profile() {
  const { userCtx } = useUserContext();

  const [selectedProvince, setSelectedProvince] = useState(userCtx.me.province);
  const [selectedDistrict, setSelectedDistrict] = useState(userCtx.me.district);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(userCtx.me.subdistrict);
  const [query, setQuery] = useState("");

  const filteredProvince = query === "" ? province : province.filter((province) => province.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));
  const filteredDistrict = query === "" ? district : district.filter((district) => district.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));
  const filteredSubdistrict = query === "" ? subdistrict : subdistrict.filter((subdistrict) => subdistrict.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

  useEffect(() => {
    setSelectedProvince(userCtx.me.province);
    setSelectedDistrict(userCtx.me.district);
    setSelectedSubdistrict(userCtx.me.subdistrict);
  }, [userCtx.me]);

  return (
    <div>
      <div className="flex gap-x-4">
        <Input label="Nama depan" value={userCtx.me.firstName}></Input>
        <Input label="Nama belakang" value={userCtx.me.lastName}></Input>
        <Input label="Username" value={userCtx.me.username} icon="fingerPrint"></Input>
      </div>
      <div className="flex gap-x-4">
        <Input label="Alamat e-mail" value={userCtx.me.email} icon="email"></Input>
        <Input label="Nomor telepon" value={userCtx.me.cellphone}></Input>
      </div>
      <div className="flex gap-x-4">
        <div className="text-sm">
          <p className="mb-2">Provinsi</p>
          <Combobox value={selectedProvince} onChange={setSelectedProvince}>
            <div className="relative">
              <div className="relative w-full flex gap-x-2 cursor-default p-2.5 pl-3 overflow-hidden border border-gray-300 rounded-lg bg-white">
                <ProvinceIcon />
                <Combobox.Input placeholder="Provinsi" className="w-full focus:outline-none" displayValue={(province) => province} onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center p-4"></Combobox.Button>
              </div>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                <Combobox.Options className="shadow-sm absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white p-2">
                  {filteredProvince.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-1 px-2 text-gray-700">Nothing found.</div>
                  ) : (
                    filteredProvince.map((province, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) => `relative cursor-pointer select-none px-2 py-1 rounded ${active ? "bg-electron-500 text-white" : "text-gray-900"}`}
                        value={province}
                      >
                        {({ selected }) => <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{province}</span>}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className="text-sm">
          <p className="mb-2">Kabupaten</p>
          <Combobox value={selectedDistrict} onChange={setSelectedDistrict}>
            <div className="relative">
              <div className="relative w-full flex gap-x-2 cursor-default p-2.5 pl-3 overflow-hidden border border-gray-300 rounded-lg bg-white">
                <DistrictIcon />
                <Combobox.Input placeholder="Kabupaten" className="w-full focus:outline-none" displayValue={(district) => district} onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center p-4"></Combobox.Button>
              </div>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                <Combobox.Options className="shadow-sm absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-lg border bg-white p-2">
                  {filteredDistrict.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-1 px-2 text-gray-700">Nothing found.</div>
                  ) : (
                    filteredDistrict.map((district, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) => `relative cursor-pointer select-none px-2 py-1 rounded ${active ? "bg-electron-500 text-white" : "text-gray-900"}`}
                        value={district}
                      >
                        {({ selected }) => <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{district}</span>}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className="text-sm">
          <p className="mb-2">Kecamatan</p>
          <Combobox value={selectedSubdistrict} onChange={setSelectedSubdistrict}>
            <div className="relative">
              <div className="relative w-full flex gap-x-2 cursor-default p-2.5 pl-3 overflow-hidden border border-gray-300 rounded-lg bg-white">
                <SubdistrictIcon />
                <Combobox.Input placeholder="Kecamatan" className="w-full focus:outline-none" displayValue={(subdistrict) => subdistrict} onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center p-4"></Combobox.Button>
              </div>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                <Combobox.Options className="shadow-sm absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white p-2">
                  {filteredSubdistrict.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-1 px-2 text-gray-700">Nothing found.</div>
                  ) : (
                    filteredSubdistrict.map((subdistrict, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) => `relative cursor-pointer select-none px-2 py-1 rounded ${active ? "bg-electron-500 text-white" : "text-gray-900"}`}
                        value={subdistrict}
                      >
                        {({ selected }) => <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{subdistrict}</span>}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
      <div className="text-sm mt-4">
        <p className="mb-2">Alamat lengkap</p>
        <textarea className="border resize-none px-4 py-2 focus:outline-none border-gray-300 w-full rounded-lg" defaultValue={userCtx.me.address || ""} cols="30" rows="4"></textarea>
      </div>
      <div className="flex mt-4">
        <Input label="NIP" icon="nin" value={userCtx.me.nin} />
      </div>
      <div className="flex gap-x-4">
        <Input label="Pekerjaan" icon="job" value={userCtx.me.job} placeHolder="Artist" type="text" />
        <Input label="Gaji perbulan" icon="currency" value={userCtx.me.salary} placeHolder="Artist" type="text" />
        <Input label="Pengeluaran perbulan" icon="currency" value={userCtx.me.expense} placeHolder="Artist" type="text" />
      </div>
      <div className="flex mb-32 mt-5">
        <Button style="electron" text="Simpan" height="py-2" width="px-6" round="rounded-md" />
      </div>
    </div>
  );
}

export { Profile };
