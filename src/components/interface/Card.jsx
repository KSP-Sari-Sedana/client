import { Badge } from "./Badge";

function Submission({ id, status, date, productName, productType }) {
  const day = new Date(date).toLocaleString("id-ID", { weekday: "long" });
  const dateNow = new Date(date).toLocaleString("id-ID", { day: "numeric" });
  const month = new Date(date).toLocaleString("id-ID", { month: "short" });

  return (
    <div className="cursor-pointer border rounded-xl bg-white w-72 h-20 text-sm leading-4 flex items-center p-6">
      <div className="border-r pr-3">
        <p>{day},</p>
        <p>{`${dateNow} ${month}`}</p>
      </div>
      <div className="grow pl-3">
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold">{productName}</p>
          <div className="flex gap-x-2">
            <Badge style={status === "Ditinjau" ? "buttercup" : status === "Diterima" ? "rice" : "pippin"}>{status}</Badge>
            <Badge style="clear">{productType}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = {
  Submission,
};

export { Card };
