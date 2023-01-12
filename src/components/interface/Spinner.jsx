import { SpinnerIcon } from "../icons/SpinnerIcon";

function Spinner({ text, className }) {
  return (
    <div className={`text-sm flex items-center ${className}`}>
      <span>
        <SpinnerIcon />
      </span>
      <span className="ml-2">{text}</span>
    </div>
  );
}

export { Spinner };
