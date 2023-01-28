import { StackIcon } from "../icons/StackIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { NotepadIcon } from "../icons/NotepadIcon";
import { useNotifContext } from "../../context/notifContext";

function Announcement({ id, category, detail, isRead, date, action }) {
  const { notifCtx } = useNotifContext();
  date = new Date(date).toLocaleString("id-ID", { month: "long", day: "2-digit", year: "numeric" });

  return (
    <div
      onClick={() => {
        notifCtx.markAsRead(id);
        action();
      }}
      className={`my-2 relative rounded-md hover:bg-zinc-100 ${isRead ? "bg-white" : "bg-green-50"}`}
    >
      {!isRead && (
        <div className="text-sm cursor-pointer bg-gray-50 rounded-md absolute w-full h-full flex items-center justify-center hover:opacity-100 opacity-0">
          <p>Tandai dibaca</p>
        </div>
      )}
      <div className="flex py-1 px-4 items-center gap-x-3">
        <div>
          {category === "Transaksi" && <StackIcon />}
          {category === "Pengajuan" && <NotepadIcon />}
          {category === "Akun" && <ProfileIcon />}
        </div>
        <div className="grow">
          <p className="text-sm font-bold leading-tight">
            {category} <date className="font-normal text-zinc-400">@ {date}</date>
          </p>
          <p className="text-sm h-9 text-ellipsis overflow-hidden text-slate-600 leading-tight">{detail}</p>
        </div>
      </div>
    </div>
  );
}

export { Announcement };
