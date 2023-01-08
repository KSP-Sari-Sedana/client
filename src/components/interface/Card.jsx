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

const Card = {
  Submission,
};

export { Card };
