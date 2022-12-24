import { Badge } from "./Badge";
import { Button } from "./Button";

function Product({ isAction, link }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-80 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <img src="/assets/placeholder.svg" alt="" className="mx-auto" />
        <div className="px-2">
          <p className="font-sourcecodepro font-bold text-2xl mt-2 mb-2">SIPURA</p>
          <Badge style="clear" content="Simpanan" />
          <Badge style="clear" content="0,5%" />
          <p className="text-sm mt-2 text-slate-600">Simpanan program yang diperuntukan untuk kegiatan upacara keagamaan.</p>
          <div className="flex items-center mt-2">
            <div>
              <div className="flex -space-x-4">
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-bagus.svg" alt="" />
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rama.svg" alt="" />
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rizky.svg" alt="" />
              </div>
            </div>
            <div>
              <p className="flex justify-center items-center w-10 h-10 text-sm font-sourcecodepro font-bold bg-transparent">+154</p>
            </div>
            <div className="ml-5">{isAction && <Button icon="arrowRight" link={link} text="Ajukan" style="cheerful" round="rounded-md" />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Product };
