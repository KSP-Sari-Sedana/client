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
            <div className="flex items-center">
              <input
                className="mr-2 h-4 w-4 absolute opacity-0"
                type="checkbox"
                onChange={() => {
                  authCtx.setIsRemember(!authCtx.isRemember);
                }}
              />
              <div className="bg-white border-2 rounded-md border-blue-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                {authCtx.isRemember && (
                  <svg viewBox="0 0 17 12" className="w-2 h-2">
                    <path
                      fill="#1F73F1"
                      d="M25.576 11.414a1.386 1.386 0 010 1.996l-9.404 9.176a1.461 1.461 0 01-1.023.414c-.37 0-.74-.139-1.023-.414l-4.701-4.588a1.386 1.386 0 010-1.996 1.47 1.47 0 012.045 0l3.68 3.59 8.38-8.178a1.47 1.47 0 012.046 0z"
                      transform="translate(-9 -11)"
                    ></path>
                  </svg>
                )}
              </div>
              <label className="text-zinc-800 text-sm">Ingat login saya</label>
            </div>
            <div className="mt-6">
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
