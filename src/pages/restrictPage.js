import { Navbar } from "../components/interface/Navbar";

function RestrictPage({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div>
          <img src="/assets/placeholder.svg" alt="" className="mx-auto w-48 font" />
          <p className="text-center text-slate-600 mt-5">{children}</p>
        </div>
      </div>
    </div>
  );
}

export { RestrictPage };
