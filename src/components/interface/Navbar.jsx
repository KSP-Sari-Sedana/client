import { Logo } from "./Logo";
import { Button } from "./Button";
import { Notification } from "./Notification";
import { UserMenu } from "./UserMenu";
import { useAuthContext } from "../../context/authContext";

function Navbar() {
  const { authContexts } = useAuthContext();

  return (
    <div className="bg-pampas-50 px-2 py-2.5 fixed w-10/12 top-0 border-b border-slate-200 z-10">
      <div className="flex items-center justify-between">
        <div className="w-72">
          <Logo />
        </div>
        <ul className="flex p-4 space-x-14">
          <li className="w-14">
            <a href="/#product" className="text-zinc-500 hover:text-zinc-800 text-sm">
              Produk
            </a>
          </li>
          <li className="w-14">
            <a href="/#location" className="text-zinc-500 hover:text-zinc-800 text-sm">
              Lokasi
            </a>
          </li>
          <li className="w-14">
            <a href="/#about" className="text-zinc-500 hover:text-zinc-800 text-sm">
              Tentang
            </a>
          </li>
          <li className="w-14">
            <a href="/#footer" className="text-zinc-500 hover:text-zinc-800 text-sm">
              Kontak
            </a>
          </li>
        </ul>
        <div className="w-72">
          {authContexts.isAuth ? (
            <div className="flex place-content-end">
              <div className="flex items-center space-x-8">
                <Notification />
                <UserMenu />
              </div>
            </div>
          ) : (
            <div className="flex space-x-4 place-content-end">
              <Button text="Masuk" style="light" link="/login" height="py-2" width="px-6" round="rounded-md" />
              <Button text="Register" style="electron" link="/register" height="py-2" width="px-6" round="rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Navbar };
