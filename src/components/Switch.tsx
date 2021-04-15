import React, { useState } from "react";

// Based on https://tailwindcomponents.com/component/toggle

const onClasses =
  "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-blue-600 transform translate-x-full";
const offClasses =
  "absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";

export default function Switch(props: {
  label?: string;
  callback: (enabled: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <label className="mt-3 inline-flex items-center cursor-pointer">
        <span className="relative">
          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
          <span className={enabled ? onClasses : offClasses}>
            <input
              type="checkbox"
              className="absolute opacity-0 w-0 h-0"
              onClick={() => {
                props.callback(!enabled);
                setEnabled(!enabled);
              }}
            />
          </span>
        </span>
        <span className="ml-3 text-sm">{props.label ? props.label : ""}</span>
      </label>
    </div>
  );
}
