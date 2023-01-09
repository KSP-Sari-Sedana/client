function Submission({ submDate, productName, children }) {
  const day = new Date(submDate).toLocaleString("id-ID", { weekday: "short" });
  const date = new Date(submDate).toLocaleString("id-ID", { day: "numeric" });
  const month = new Date(submDate).toLocaleString("id-ID", { month: "short" });

  return (
    <div className="border rounded-xl bg-white w-72 h-20 text-sm leading-4 flex items-center py-6 px-5">
      <div className="border-r pr-2">
        <p>{day},</p>
        <p>{`${date} ${month}`}</p>
      </div>
      <div className="pl-2">
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold">{productName}</p>
          <div className="flex gap-x-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Consumed({ settleDate, accNumber, productName, productType, balance }) {
  const day = new Date(settleDate).toLocaleString("id-ID", { weekday: "short" });
  const date = new Date(settleDate).toLocaleString("id-ID", { day: "numeric" });
  const month = new Date(settleDate).toLocaleString("id-ID", { month: "short" });

  let formatedAccNumber = "";

  for (let i = 0; i < accNumber?.toString().length; i++) {
    if (i > 0 && (i + 1) % 3 === 0) {
      formatedAccNumber += " ";
    }
    formatedAccNumber += accNumber?.toString()[i];
  }

  return (
    <div className="border rounded-xl bg-white w-72 h-20 text-sm leading-4 flex items-center py-6 px-5">
      <div className="border-r w-16 pr-2">
        <p>{day},</p>
        <p>{`${date} ${month}`}</p>
      </div>
      <div className="pl-3 grow">
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold leading-4">{productName}</p>
          <p className="font-sourcecodepro font-semibold leading-4">rek: {formatedAccNumber}</p>
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
