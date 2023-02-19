import { Navbar } from "../components/interface/Navbar";
import { NotFoundArt } from "../components/art/NotFoundArt";

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div>
          <NotFoundArt />
          <p className="font-sourcecodepro text-center text-8xl text-gray-800 font-bold">404</p>
          <p className="text-center text-slate-600 text-sm">Halaman tidak ditemukan</p>
        </div>
      </div>
    </div>
  );
}

export { NotFoundPage };
