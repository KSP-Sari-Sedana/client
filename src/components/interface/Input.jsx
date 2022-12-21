import { AtIcon } from "../icons/AtIcon";
import { KeyIcon } from "../icons/KeyIcon";
import { FingerPrintIcon } from "../icons/FingerPrintIcon";

function Input({ label, type, placeHolder, icon, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm">{label}</label>
      <div className={icon && `relative`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon === "email" && <AtIcon />}
            {icon === "password" && <KeyIcon />}
            {icon === "fingerPrint" && <FingerPrintIcon />}
          </div>
        )}
        <input type={type} className={`border border-gray-300 text-sm text-zinc-900 rounded-lg w-full p-2.5 ${icon ? "pl-10" : "pl-4"}`} placeholder={placeHolder} />
      </div>
    </div>
  );
}

export { Input };
