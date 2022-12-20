function Badge({ style, content }) {
  const clear = "text-clear-500 bg-clear-50 border-clear-500";
  const magenta = "text-magenta-600 bg-magenta-200 border-magenta-600";
  const pippin = "text-pippin-700 bg-pippin-100 border-pippin-700";
  const rice = "text-rice-600 bg-rice-50 border-rice-600";
  const buttercup = "text-buttercup-400 bg-buttercup-50 border-buttercup-400";

  if (style === "clear") style = clear;
  else if (style === "magenta") style = magenta;
  else if (style === "pippin") style = pippin;
  else if (style === "rice") style = rice;
  else if (style === "buttercup") style = buttercup;

  return <span className={`text-sm px-3.5 py-1 rounded-full border mr-3 ${style}`}> {content} </span>;
}

export { Badge };
