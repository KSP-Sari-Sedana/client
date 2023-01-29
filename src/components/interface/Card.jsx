import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Badge } from "./Badge";
import { ArrowIcon } from "../icons/ArrowIcon";
import { HolderIcon } from "../icons/PlaceholderIcon";
import { WarningIcon } from "../icons/WarningIcon";
import { ThumbIcon } from "../icons/ThumbIcon";
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

function Consumed({ settleDate, accNumber, productName, productType, balance, accStatus }) {
  const { helpCtx } = useHelperContext();
  return (
    <div className="border rounded-xl bg-white h-20 text-sm leading-4 flex items-center gap-x-3 py-6 px-5">
      {settleDate && (
        <Fragment>
          <div className="">
            <p>{helpCtx.getDay(settleDate, "short")},</p>
            <p>{`${helpCtx.getDate(settleDate, "numeric")} ${helpCtx.getMonth(settleDate, "short")}`}</p>
          </div>
          <div className="border-r-2 border-gray-300 h-full"></div>
        </Fragment>
      )}
      <div className={`${settleDate && ""} grow`}>
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold leading-4">{productName}</p>
          <p className="font-sourcecodepro font-semibold leading-4">rek: {helpCtx.formatAccNumber(accNumber)}</p>
          <p className={`font-darkergrotesque text-lg font-extrabold leading-4 mt-1 ${productType === "Simpanan" ? "text-clear-600" : "text-bethlehem-600"}`}>Rp. {balance}</p>
        </div>
      </div>
      {accStatus && (
        <Fragment>
          <div className="border-r-2 border-gray-300 h-full"></div>
          <div className="flex flex-col items-center gap-y-1">
            <p>Angsuran</p>
            <Badge style={accStatus === "Selesai" ? "clear" : "buttercup"}>{accStatus}</Badge>
          </div>
        </Fragment>
      )}
    </div>
  );
}

function ConsumedAlert({ nextPaymentDate, deposit, settleDate, tenor, accStatus }) {
  const { helpCtx } = useHelperContext();

  const day = deposit === "Harian" ? 1 : deposit === "Sekali" ? 0 : 30;
  let nextPayment = undefined;
  if (day !== 0) {
    nextPayment = helpCtx.addDays(nextPaymentDate, day);
    nextPayment = `Pembayaran berikutnya ${helpCtx.getFullDate(nextPayment)}`;
  } else {
    nextPayment = `Angsuran telah selesai`;
  }

  let maturityDate = undefined;
  if (tenor !== 0) {
    maturityDate = helpCtx.addDays(settleDate, tenor * 30);
    maturityDate = `Jatuh tempo ${helpCtx.getFullDate(maturityDate)}`;
  }

  return (
    <Fragment>
      <div className="border rounded-xl bg-white h-20 text-sm leading-4 flex items-center py-6 px-5">
        <div className="flex flex-col items-center gap-y-1">
          {accStatus !== "Selesai" ? (
            <Fragment>
              <div className="text-bethlehem-500">
                <WarningIcon.Triangle />
              </div>
              <p>{nextPayment}</p>
              <p>{maturityDate}</p>
            </Fragment>
          ) : (
            <Fragment>
              <div className="text-clear-500">
                <ThumbIcon />
              </div>
              <p>Kerja bagus, Anda telah</p>
              <p>menyelesaikan angsuran ini!</p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

function TinyProduct({ productName, status, image, id }) {
  return (
    <div className="border w-min rounded-xl bg-white text-sm p-2">
      <div className={`overflow-hidden w-[144px] h-[93px] rounded-xl`}>
        {image ? (
          <div>
            <img src={image} alt="" className="h-full w-full" />
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
              <ArrowIcon.Dart aim="rightTop" />
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
  ConsumedAlert,
  TinyProduct,
};

export { Card };
