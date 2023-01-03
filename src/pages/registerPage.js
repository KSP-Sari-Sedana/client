import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Input } from "../components/interface/Input";
import { Button } from "../components/interface/Button";
import { Toast } from "../components/interface/Toast";
import { useUserContext } from "../context/userContext";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { userCtx } = useUserContext();

  async function registerHandler() {
    setIsLoading(true);
    await userCtx.register();
    setIsLoading(false);
  }

  return (
    <Fragment>
      {userCtx.APIMessage && <Toast text={userCtx.APIMessage} type="error" />}
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/6">
          <h1 className="font-darkergrotesque text-center text-6xl font-bold mb-5">Register</h1>
          <div>
            <Input action={userCtx.setUsername} label="Nama pengguna" placeHolder="username" type="text" icon="fingerPrint" value={userCtx.username} />
            <Input action={userCtx.setEmail} label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" value={userCtx.email} />
            <div className="grid grid-cols-2 gap-4">
              <Input action={userCtx.setFirstName} label="Nama depan" placeHolder="Bagus" type="text" value={userCtx.firstName} />
              <Input action={userCtx.setLastName} label="Nama belakang" placeHolder="Suprapta" type="text" value={userCtx.lastName} />
            </div>
            <Input action={userCtx.setPassword} label="Password" placeHolder="password" type="password" icon="password" value={userCtx.password} />
            <div className="mt-10">
              <Button isLoading={isLoading} action={registerHandler} text="Register" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
            </div>
            <p className="mt-5 text-center text-sm text-zinc-700">
              Sudah punya akun?{" "}
              <Link className="text-electron-500" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { RegisterPage };
