import { Logo } from "./Logo";
import { Button } from "./Button";
import { Notification } from "./Notification";
import { UserMenu } from "./UserMenu";
import { useAuthContext } from "../../context/authContext";

function Navbar() {
  const { authCtx } = useAuthContext();

  return (
    <div className="bg-pampas-50 px-2 py-2.5 fixed w-10/12 top-0 border-b border-slate-200 z-10">
      <div className="items-center justify-between flex">
        <div className="w-48">
          <Logo />
        </div>
        <div className="mx-auto">
          <nav className="flex p-4 space-x-20 justify-between text-zinc-500 text-sm">
            <a href="/#product" className="hover:text-zinc-800">
              Produk
            </a>
            <a href="/#location" className="hover:text-zinc-800">
              Lokasi
            </a>
            <a href="/#about" className="hover:text-zinc-800">
              Tentang
            </a>
            <a href="/#footer" className="hover:text-zinc-800">
              Kontak
            </a>
          </nav>
        </div>
        <div className="w-48">
          {authCtx.isLoggedIn ? (
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
