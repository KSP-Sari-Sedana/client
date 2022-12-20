import { Logo } from "./Logo";
import { FacebookIcon } from "../icons/FacebookIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

function Footer() {
  return (
    <footer className="mt-40 border border-slate-200 border-l-0 border-r-0 border-b-0" id="footer">
      <div className="grid grid-cols-5 mx-44 my-9">
        <div className="col-span-3">
          <Logo />
          <p className="text-sm text-zinc-600">Nomor AHU-0000492.AH.01.38.Tahun 2022</p>
          <p className="text-sm text-zinc-600 mt-4">
            Manjadi koperasi yang tangguh, dan mandiri <br /> yang memberikan manfaat bagi <br /> anggota dan masyarakat
          </p>
          <div className="flex space-x-5 mt-3 items-center">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">Produk</p>
          <p className="text-slate-700 text-sm">Simpanan</p>
          <p className="text-slate-700 text-sm">Pinjaman</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Kontak</p>
          <p className="text-slate-700 text-sm">0813 3716 8194</p>
          <p className="text-slate-700 text-sm">kopsarisedanabali@yahoo.com</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
