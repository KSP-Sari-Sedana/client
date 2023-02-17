import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <p className="text-3xl tracking-tighter">
          <span className="font-extrabold">Sari</span>
          <span className="font-normal">Sedana</span>
        </p>
      </div>
    </Link>
  );
}

export { Logo };
