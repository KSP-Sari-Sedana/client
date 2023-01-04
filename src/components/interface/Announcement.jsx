import { Link } from "react-router-dom";

import { StackIcon } from "../icons/StackIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { NotepadIcon } from "../icons/NotepadIcon";

function Announcement({ category, detail, isRead, link, date }) {
  return (
    <Link to={link}>
      <div className={`my-2 py-1 px-4 rounded-md hover:bg-zinc-100 cursor-pointer ${isRead ? "bg-white" : "bg-green-50"}`}>
        <div className="flex items-center gap-x-3">
          <div>
            {category === "Transaksi" && <StackIcon />}
            {category === "Pengajuan" && <NotepadIcon />}
            {category === "Akun" && <ProfileIcon />}
          </div>
          <div className="grow">
            <p className="text-sm font-bold leading-tight">
              {category} <date className="font-normal text-zinc-400">@{date}</date>
            </p>
            <p className="text-sm h-9 text-ellipsis overflow-hidden text-slate-600 leading-tight">{detail}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { Announcement };
