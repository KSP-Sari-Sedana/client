import { Fragment } from "react";
import { Link } from "react-router-dom";

import { ArrowIcon } from "../icons/ArrowIcon";
import { SpinnerIcon } from "../icons/SpinnerIcon";

function Button({ text, style, link, round, height, width, icon, action, isLoading, isDisable }) {
  const electron = "bg-electron-500 hover:bg-electron-600 text-white text-sm text-center";
  const light = "bg-gray-100 hover:bg-gray-200 text-zinc-900 text-sm text-center";
  const bethlehem = "bg-bethlehem-700 hover:bg-bethlehem-800 text-white text-sm text-center";
  const cheerful = "bg-cheerful-400 text-zinc-900 text-sm py-2 px-6";

  if (style === "electron") style = electron;
  else if (style === "light") style = light;
  else if (style === "bethlehem") style = bethlehem;
  else if (style === "cheerful") style = cheerful;

  if (isDisable) {
    return (
      <div className={`${style} ${height} ${width} ${round} opacity-60 cursor-not-allowed`}>
        <div className="flex items-center justify-center">
          <button className="cursor-not-allowed">{text}</button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {isLoading ? (
        <div className={`${style} ${height} ${width} ${round} opacity-70 cursor-not-allowed`}>
          <div className="flex items-center justify-center">
            <SpinnerIcon />
            <button className="cursor-not-allowed ml-2">Loading</button>
          </div>
        </div>
      ) : (
        <Link to={link} onClick={action}>
          <div className={`${style} ${height} ${width} ${round}`}>
            <div className="flex items-center justify-center">
              <button>{text}</button>
              {icon === "arrow" && <ArrowIcon />}
            </div>
          </div>
        </Link>
      )}
    </Fragment>
  );
}

export { Button };
