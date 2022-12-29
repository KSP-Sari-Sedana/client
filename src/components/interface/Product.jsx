import { Badge } from "./Badge";
import { Button } from "./Button";

function Product(props) {
  const { product, isPreview } = props;

  return (
    <div className="flex flex-col items-center">
      <div className="w-80 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <img src="/assets/placeholder.svg" alt="" className="mx-auto" />
        <div className="px-2">
          <p className="font-sourcecodepro font-bold text-2xl mt-2 mb-2">{product.name}</p>
          <div className="flex">
            <Badge style="clear" content={product.type} />
            <Badge style="clear" content={`${product.interest}%`} />
            <Badge style="clear" content={`${product.deposit}`} />
          </div>
          <p className={`text-sm mt-2 text-slate-600 font-normal ${isPreview && "h-11 overflow-hidden"}`}>{product.description}</p>
          <div className="flex items-center mt-2">
            <div>
              <div className="flex -space-x-4">
                <img className="w-10 h-10 rounded-full border-4 border-white" src="/assets/profile-picture-bagus.svg" alt="" />
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
