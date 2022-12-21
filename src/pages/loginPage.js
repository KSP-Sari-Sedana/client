import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Input } from "../components/interface/Input";
import { Navbar } from "../components/interface/Navbar";
import { Button } from "../components/interface/Button";
import { Heading } from "../components/interface/Heading";

function LoginPage() {
  return (
    <Fragment>
      <Navbar />
      <Heading text="Masuk" />
      <div className="w-2/6 mx-auto">
        <Input label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" />
        <Input label="Password" placeHolder="password" type="password" icon="password" />
        <div className="mt-10">
          <Button text="Masuk" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
        </div>
        <p className="mt-5 text-center text-sm text-zinc-700">
          Tidak punya akun?{" "}
          <Link className="text-electron-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </Fragment>
  );
}

export { LoginPage };
