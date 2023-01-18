import { MailIcon } from "../icons/MailIcon";
import { KeyIcon } from "../icons/KeyIcon";
import { FingerPrintIcon } from "../icons/FingerPrintIcon";
import { CurrencyIcon } from "../icons/CurrencyIcon";
import { NINIcon } from "../icons/NINIcon";
import { BriefcaseIcon } from "../icons/BriefcaseIcon";
import { PhoneIcon } from "../icons/PhoneIcon";

function Input({ label, type, placeHolder, icon, value, action, isDisabled }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm">{label}</label>
      <div className={icon && `relative`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon === "email" && <MailIcon />}
            {icon === "password" && <KeyIcon />}
            {icon === "fingerPrint" && <FingerPrintIcon />}
            {icon === "currency" && <CurrencyIcon />}
            {icon === "nin" && <NINIcon />}
            {icon === "job" && <BriefcaseIcon />}
            {icon === "phone" && <PhoneIcon />}
          </div>
        )}
        <input
          onChange={(event) => {
            action(event.target.value);
          }}
          disabled={isDisabled}
          type={type}
          className={`border border-gray-300 text-sm text-zinc-900 rounded-lg w-full p-2.5 ${icon ? "pl-10" : "pl-4"} focus:outline-none`}
          placeholder={placeHolder}
          value={value}
        />
      </div>
    </div>
  );
}

export { Input };
