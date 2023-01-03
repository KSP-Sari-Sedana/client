import { Link } from "react-router-dom";

import { StackIcon } from "../icons/StackIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { NotepadIcon } from "../icons/NotepadIcon";

function Announcement({ category, detail, isRead, link }) {
  return (
    <Link to={link}>
      <div className={`my-2 py-1 px-5 rounded-md hover:bg-zinc-100 cursor-pointer ${isRead ? "bg-white" : "bg-green-50"}`}>
        <div className="grid grid-cols-9 items-center">
          <div>
            {category === "Transaksi" && <StackIcon />}
            {category === "Pengajuan" && <NotepadIcon />}
            {category === "Akun" && <ProfileIcon />}
          </div>
          <div className="col-span-8">
            <p className="text-sm font-bold leading-tight">{category}</p>
            <p className="text-sm text-slate-600 leading-tight">{detail}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { Announcement };
