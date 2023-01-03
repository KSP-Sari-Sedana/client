import { RadioGroup } from "@headlessui/react";
import { CheckMarkIcon } from "../icons/CheckMarkIcon";

function Radio({ value, onChange, data, cols }) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <div className={`grid grid-cols-${cols} gap-2`}>
        {data?.map((value, index) => {
          return (
            <RadioGroup.Option key={index} value={value} className="bg-zinc-50 rounded overflow-hidden">
              {({ checked }) => (
                <div className={`${checked && "bg-clear-50 text-clear-500"} rounded cursor-pointer text-sm px-2 py-1 flex items-center`}>
                  <CheckMarkIcon isChecked={checked} />
                  <span>{value.toLocaleString("ID-id")}</span>
                </div>
              )}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}

export { Radio };
