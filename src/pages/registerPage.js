import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Input } from "../components/interface/Input";
import { Button } from "../components/interface/Button";
import { Toast } from "../components/interface/Toast";
import { useUserContext } from "../context/userContext";

function RegisterPage() {
  const { userContexts } = useUserContext();
  const { errors, message } = userContexts.APIResponse;

  return (
    <Fragment>
      {errors && <Toast text={message} type="error" />}
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/6">
          <h1 className="font-darkergrotesque text-center text-6xl font-bold mb-5">Register</h1>
          <div>
            <Input action={userContexts.setUsername} label="Nama pengguna" placeHolder="username" type="text" icon="fingerPrint" value={userContexts.username} />
            <Input action={userContexts.setEmail} label="Alamat e-mail" placeHolder="user@email.com" type="email" icon="email" value={userContexts.email} />
            <div className="grid grid-cols-2 gap-4">
              <Input action={userContexts.setFirstName} label="Nama depan" placeHolder="Bagus" type="text" value={userContexts.firstName} />
              <Input action={userContexts.setLastName} label="Nama belakang" placeHolder="Suprapta" type="text" value={userContexts.lastName} />
            </div>
            <Input action={userContexts.setPassword} label="Password" placeHolder="password" type="password" icon="password" value={userContexts.password} />
            <div className="mt-10">
              <Button isLoading={userContexts.isLoading.register} action={userContexts.register} text="Register" style="electron" height="py-2.5" width="px-6" round="rounded-md" />
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
