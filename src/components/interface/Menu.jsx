import { Fragment } from "react";
import { Link } from "react-router-dom";

import { TrainingIcon } from "../icons/TrainingIcon";
import { FlagIcon } from "../icons/FlagIcon";
import { ShieldIcon } from "../icons/ShieldIcon";
import { NotepadIcon } from "../icons/NotepadIcon";
import { LockIcon } from "../icons/LockIcon";
import { ViewIcon } from "../icons/ViewIcon";
import { PuzzleIcon } from "../icons/PuzzleIcon";
import { ProductIcon } from "../icons/ProductIcon";
import { SmileIcon } from "../icons/SmileIcon";

function User() {
  return (
    <Fragment>
      <p className="text-sm mb-2 mt-2 font-medium">Anggota</p>
      <div className="px-1 text-sm">
        <Link to="/dashboard" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <FlagIcon /> <p>Ikhtisar</p>
        </Link>
        <Link to="/dashboard/submission" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <NotepadIcon /> <p>Pengajuan</p>
        </Link>
        <Link to="/dashboard/saving" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <LockIcon /> <p>Simpanan</p>
        </Link>
        <Link to="/dashboard/loan" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <ShieldIcon /> <p>Pinjaman</p>
        </Link>
      </div>
    </Fragment>
  );
}

function Admin() {
  return (
    <Fragment>
      <p className="text-sm mb-2 mt-2 font-medium">Admin</p>
      <div className="px-1 text-sm">
        <Link to="/dashboard/admin" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <TrainingIcon /> <p>Ikhtisar</p>
        </Link>
        <Link to="/dashboard/admin/submission" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <ViewIcon /> <p>Pengajuan</p>
        </Link>
        <Link to="/dashboard/admin/transaction" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <PuzzleIcon /> <p>Transaksi</p>
        </Link>
        <Link to="/dashboard/admin/product" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <ProductIcon /> <p>Produk</p>
        </Link>
        <Link to="/dashboard/admin/user" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <SmileIcon /> <p>Anggota</p>
        </Link>
      </div>
    </Fragment>
  );
}

function Teller() {
  return (
    <Fragment>
      <p className="text-sm mb-2 mt-2 font-medium">Teller</p>
      <div className="px-1 text-sm">
        <Link to="/dashboard/teller/transaction" className="flex gap-x-2 items-center w-full cursor-pointer px-2 p-1.5 rounded-md hover:bg-zinc-100">
          <PuzzleIcon /> <p>Transaksi</p>
        </Link>
      </div>
    </Fragment>
  );
}

const Menu = {
  User,
  Admin,
  Teller,
};

export { Menu };
