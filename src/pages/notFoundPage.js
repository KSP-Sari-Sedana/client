import { Navbar } from "../components/interface/Navbar";

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="mt-32">
        <img src="/assets/placeholder.svg" alt="" className="mx-auto w-48" />
        <p className="font-darkergrotesque text-center text-9xl font-bold">404</p>
        <p className="text-center text-slate-600">Halaman tidak ditemukan</p>
      </div>
    </div>
  );
}

export { NotFoundPage };
