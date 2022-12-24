import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Input } from "../components/interface/Input";
import { Navbar } from "../components/interface/Navbar";
import { Button } from "../components/interface/Button";
import { Toast } from "../components/interface/Toast";
import { useAuthContext } from "../context/authContext";

function LoginPage() {
  const { authContexts } = useAuthContext();
  const { errors, message } = authContexts.APIResponse;

  return (
    <Fragment>
      <Navbar />
      {errors && <Toast text={message} type="error" />}
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/6">
          <h1 className="font-darkergrotesque text-center text-6xl font-bold mb-5">Masuk</h1>
          <div>
            <Input action={authContexts.setEmail} label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" value={authContexts.email} />
            <Input action={authContexts.setPassword} label="Password" placeHolder="password" type="password" icon="password" value={authContexts.password} />
            <div className="mt-10">
              <Button isLoading={authContexts.isLoading.login} action={authContexts.login} text="Masuk" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
            </div>
            <p className="mt-5 text-center text-sm text-zinc-700">
              Tidak punya akun?{" "}
              <Link className="text-electron-500" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { LoginPage };
