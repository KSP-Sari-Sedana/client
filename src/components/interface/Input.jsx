import { AtIcon } from "../icons/AtIcon";
import { KeyIcon } from "../icons/KeyIcon";
import { FingerPrintIcon } from "../icons/FingerPrintIcon";
import { CurrencyIcon } from "../icons/CurrencyIcon";

function Input({ label, type, placeHolder, icon, value, action }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm">{label}</label>
      <div className={icon && `relative`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon === "email" && <AtIcon />}
            {icon === "password" && <KeyIcon />}
            {icon === "fingerPrint" && <FingerPrintIcon />}
            {icon === "currency" && <CurrencyIcon />}
          </div>
        )}
        <input
          onChange={(event) => {
            action(event.target.value);
          }}
          type={type}
          className={`border border-gray-300 text-sm text-zinc-900 rounded-lg w-full p-2.5 ${icon ? "pl-10" : "pl-4"} focus:outline-none`}
          placeholder={placeHolder}
          defaultValue={value}
        />
      </div>
    </div>
  );
}

export { Input };
