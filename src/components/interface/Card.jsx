import { Badge } from "./Badge";

function Submission() {
  return (
    <div className="cursor-pointer border rounded-xl bg-white w-72 h-20 text-sm leading-4 flex items-center p-6">
      <div className="border-r pr-3">
        <p>Jumat,</p>
        <p>19 Sep</p>
      </div>
      <div className="grow pl-3">
        <div className="flex-col">
          <p className="font-sourcecodepro text-lg font-extrabold">SIPURA</p>
          <div className="flex gap-x-2">
            <Badge style="buttercup">Ditinjau</Badge>
            <Badge style="clear">Pinjaman</Badge>
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
