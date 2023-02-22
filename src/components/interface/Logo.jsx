import { Link } from "react-router-dom";
import { LogoIcon } from "../icons/LogoIcon";

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <div className="mr-2">
          <LogoIcon />
        </div>
        <p className="text-3xl tracking-tighter">
          <span className="font-extrabold">Sari</span>
          <span className="font-normal">Sedana</span>
        </p>
      </div>
    </Link>
  );
}

export { Logo };
