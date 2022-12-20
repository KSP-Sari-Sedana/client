import { Link } from "react-router-dom";

import { ArrowRightIcon } from "../icons/ArrowRightIcon";

export default function Button({ text, style, link, round, height, width }) {
  const electron = "bg-electron-500 hover:bg-electron-600 text-white text-sm text-center";
  const light = "bg-gray-100 hover:bg-gray-200 text-zinc-900 text-sm text-center";
  const bethlehem = "bg-bethlehem-700 hover:bg-bethlehem-800 text-white text-sm text-center";
  const cheerful = "bg-cheerful-400 text-zinc-900 border-2 border-zinc-900 text-sm py-2 px-8 flex items-center";

  let arrowRight = false;

  if (style === "electron") style = electron;
  else if (style === "light") style = light;
  else if (style === "bethlehem") style = bethlehem;
  else if (style === "cheerful") {
    style = cheerful;
    arrowRight = true;
  }

  return (
    <Link to={link}>
      <div className={`${style} ${height} ${width} ${round}`}>
        <button>{text}</button>
        {arrowRight && <ArrowRightIcon />}
      </div>
    </Link>
  );
}
