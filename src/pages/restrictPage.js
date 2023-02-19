import { Navbar } from "../components/interface/Navbar";
import { PritttArt } from "../components/art/PritttArt";

function RestrictPage({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex items-center justify-center">
            <PritttArt />
          </div>
          <p className="text-center text-slate-600 mt-5">{children}</p>
        </div>
      </div>
    </div>
  );
}

export { RestrictPage };
