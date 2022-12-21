import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Heading } from "../components/interface/Heading";
import { Navbar } from "../components/interface/Navbar";
import { Input } from "../components/interface/Input";
import { Button } from "../components/interface/Button";

function RegisterPage() {
  return (
    <Fragment>
      <Navbar />
      <Heading text="Register" />
      <div className="w-2/6 mx-auto">
        <Input label="Nama pengguna" placeHolder="username" type="text" icon="fingerPrint" />
        <Input label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nama depan" placeHolder="Bagus" type="text" />
          <Input label="Nama belakang" placeHolder="Suprapta" type="text" />
        </div>
        <Input label="Password" placeHolder="password" type="password" icon="password" />
        <div className="mt-10">
          <Button text="Register" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
        </div>
        <p className="mt-5 text-center text-sm text-zinc-700">
          Sudah punya akun?{" "}
          <Link className="text-electron-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
}

export { RegisterPage };
