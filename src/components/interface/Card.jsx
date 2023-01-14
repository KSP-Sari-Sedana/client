import { Badge } from "./Badge";
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

const Card = {
  Submission,
  Consumed,
};

export { Card };
