import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

import { Input } from "../components/interface/Input";
import { Navbar } from "../components/interface/Navbar";
import { Button } from "../components/interface/Button";
import { Toast } from "../components/interface/Toast";
import { useAuthContext } from "../context/authContext";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { authCtx } = useAuthContext();

  async function loginHandler() {
    setIsLoading(true);
    await authCtx.login();
    setIsLoading(false);
  }

  return (
    <Fragment>
      <Navbar />
      {authCtx.APIMessage && <Toast text={authCtx.APIMessage} type="error" />}
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/6">
          <h1 className="font-darkergrotesque text-center text-6xl font-bold mb-5">Masuk</h1>
          <div>
            <Input action={authCtx.setEmail} label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" value={authCtx.email} />
            <Input action={authCtx.setPassword} label="Password" placeHolder="password" type="password" icon="password" value={authCtx.password} />
            <div className="mt-10">
              <Button isLoading={isLoading} action={loginHandler} text="Masuk" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
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
