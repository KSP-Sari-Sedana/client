import { Navbar } from "../components/interface/Navbar";
import { GirlSadArt } from "../components/art/GirlSadArt";

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div>
          <GirlSadArt />
          <p className="font-darkergrotesque text-center text-8xl font-bold">404</p>
          <p className="text-center text-slate-600 text-sm">Halaman tidak ditemukan</p>
        </div>
      </div>
    </div>
  );
}

export { NotFoundPage };
