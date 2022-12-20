import { Announcement } from "./Announcement";
import { TollerIcon } from "../icons/TollerIcon";
import { useToggleContext } from "../../context/toggleContext";

function Notification() {
  const { isPopupNotif, togglePopupNotif } = useToggleContext();

  return (
    <>
      <div className="cursor-pointer" onClick={togglePopupNotif}>
        <TollerIcon />
        <div className="absolute h-3 w-3 bg-bethlehem-700 top-[30px] ml-2 rounded-full border-2 border-white"></div>
      </div>
      {isPopupNotif && (
        <div className="w-96 h-96 overflow-auto rounded-2xl bg-white border border-slate-200 shadow-sm px-3 py-3 absolute top-[67px] right-0">
          <p className="text-sm text-center">Notifikasi 10 hari terakhir:</p>
          <div>
            <Announcement category="Transaksi" detail="Transaksi sebesar Rp.300.000 dilakukan pada produk SIPURA" isRead={true} />
            <Announcement category="Pengajuan" detail="Selamat pengajuan produk SIPURA anda diterima" isRead={false} />
            <Announcement category="Akun" detail="Selamat datang, lengkapi profil untuk memulai menikmati produk" isRead={false} />
          </div>
        </div>
      )}
    </>
  );
}

export { Notification };
