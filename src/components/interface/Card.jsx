import { Link } from "react-router-dom";

import { Badge } from "./Badge";
import { ArrowIcon } from "../icons/ArrowIcon";
import { HolderIcon } from "../icons/PlaceholderIcon";
import { useHelperContext } from "../../context/helperContext";

function Submission({ submDate, productName, status, productType }) {
  const { helpCtx } = useHelperContext();
  return (
    <div className="border rounded-xl bg-white h-20 text-sm leading-4 flex items-center py-6 px-5">
      <div className="border-r pr-2">
        <p>{helpCtx.getDay(submDate, "short")},</p>
        <p>{`${helpCtx.getDate(submDate, "numeric")} ${helpCtx.getMonth(submDate, "short")}`}</p>
      </div>
      <div className="pl-2">
        <div className="flex-col">
          <p className="font-sourcecodepro text-base font-extrabold">{productName}</p>
          <div className="flex gap-x-2">
            <Badge style={status === "Ditinjau" ? "buttercup" : status === "Diterima" ? "rice" : "pippin"}>{status}</Badge>
            <Badge style={`${productType === "Simpanan" ? "clear" : "magenta"}`}>{productType}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function Consumed({ settleDate, accNumber, productName, productType, balance }) {
  const { helpCtx } = useHelperContext();
  return (
    <div className="border rounded-xl bg-white h-20 text-sm leading-4 flex items-center py-6 px-5">
      <div className="border-r w-16 pr-2">
        <p>{helpCtx.getDay(settleDate, "short")},</p>
        <p>{`${helpCtx.getDate(settleDate, "numeric")} ${helpCtx.getMonth(settleDate, "short")}`}</p>
      </div>
      <div className="pl-3 grow">
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold leading-4">{productName}</p>
          <p className="font-sourcecodepro font-semibold leading-4">rek: {helpCtx.formatAccNumber(accNumber)}</p>
          <p className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"}`}>Rp. {balance}</p>
        </div>
      </div>
    </div>
  );
}

function TinyProduct({ productName, status, image, id }) {
  return (
    <div className="border w-min rounded-xl bg-white text-sm p-2">
      <div className={`overflow-hidden w-[144px] h-[93px] rounded-xl ${image && "border"}`}>
        {image ? (
          <div>
            <img src={image} alt="" />
          </div>
        ) : (
          <HolderIcon.Rectangle />
        )}
      </div>
      <div className="p-2">
        <p className="font-sourcecodepro text-sm font-bold uppercase h-4 overflow-hidden">{productName}</p>
        <div className="flex justify-between mt-2 items-center">
          <Badge style={status === "Publik" ? "clear" : status === "Wajib" ? "magenta" : "pippin"}>{status}</Badge>
          <div className="cursor-pointer text-gray-400 hover:text-clear-500">
            <Link to={`${id}`}>
              <ArrowIcon aim="rightTop" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = {
  Submission,
  Consumed,
  TinyProduct,
};

export { Card };
