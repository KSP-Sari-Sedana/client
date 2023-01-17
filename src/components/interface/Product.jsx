import { Badge } from "./Badge";
import { Button } from "./Button";

function Product({ product, isPreview, children, isEditImage }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-80 bg-white border border-slate-200 rounded-xl p-4">
        <div className={`h-[200px] overflow-hidden rounded-xl relative ${isEditImage && "cursor-pointer"}`}>
          {children}
          <img src={product?.image || "/assets/placeholder.svg"} alt="" className="mx-auto" />
        </div>

        <div className="px-2">
          <p className="font-sourcecodepro font-bold text-2xl mt-2 mb-2 uppercase">{product?.name || "Nama Produk"}</p>
          <div className="flex gap-x-2">
            <Badge style="clear">{product?.type || "Tipe"}</Badge>
            <Badge style="clear">{product?.interest || "0"}%</Badge>
            <Badge style="clear">{product?.deposit || "Angsuran"}</Badge>
          </div>
          <p className={`text-sm mt-2 text-slate-600 font-normal ${isPreview && "h-11 overflow-hidden"}`}>{product?.description || "Deskripsi"}</p>
          <div className="flex items-center mt-2">
            <div>
              <div className="flex items-center -space-x-4">
                <img className="w-8 h-8 rounded-full" src="/assets/profile-picture-bagus.svg" alt="" />
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rama.svg" alt="" />
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-rizky.svg" alt="" />
              </div>
            </div>
            <div className="grow">
              <p className="text-sm font-sourcecodepro font-bold">+154</p>
            </div>
            <div>{isPreview && <Button icon="arrow" link={`/products/${product.id}`} text="Ajukan" style="cheerful" round="rounded-md" />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Product };
