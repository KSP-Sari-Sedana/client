function Badge({ style, content }) {
  const clear = "text-clear-500 bg-clear-50";
  const magenta = "text-magenta-600 bg-magenta-200";
  const pippin = "text-pippin-700 bg-pippin-100";
  const rice = "text-rice-600 bg-rice-50";
  const buttercup = "text-buttercup-400 bg-buttercup-50";

  if (style === "clear") style = clear;
  else if (style === "magenta") style = magenta;
  else if (style === "pippin") style = pippin;
  else if (style === "rice") style = rice;
  else if (style === "buttercup") style = buttercup;

  return <span className={`text-sm px-3.5 py-1 rounded-full mr-3 ${style}`}> {content} </span>;
}

export { Badge };
