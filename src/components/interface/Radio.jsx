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
function RadioText({ value, onChange, data }) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <div className={`flex gap-2`}>
        {data?.map((value, index) => {
          return (
            <RadioGroup.Option key={index} value={value}>
              {({ checked }) => (
                <div className="flex items-center">
                  <input className="mr-2 h-4 w-4 absolute opacity-0 cursor-pointer" type="checkbox" />
                  <div className="border-2 rounded-md border-blue-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    {checked && (
                      <svg viewBox="0 0 17 12" className="w-2 h-2">
                        <path
                          fill="#1F73F1"
                          d="M25.576 11.414a1.386 1.386 0 010 1.996l-9.404 9.176a1.461 1.461 0 01-1.023.414c-.37 0-.74-.139-1.023-.414l-4.701-4.588a1.386 1.386 0 010-1.996 1.47 1.47 0 012.045 0l3.68 3.59 8.38-8.178a1.47 1.47 0 012.046 0z"
                          transform="translate(-9 -11)"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <label className="text-zinc-600 text-sm cursor-pointer">{value}</label>
                </div>
              )}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}

export { Radio, RadioText };
