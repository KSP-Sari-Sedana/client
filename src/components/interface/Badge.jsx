function Badge({ style, children, className }) {
  const clear = "text-clear-500 bg-clear-50";
  const magenta = "text-magenta-600 bg-magenta-200";
  const pippin = "text-pippin-700 bg-pippin-100";
  const rice = "text-rice-600 bg-rice-50";
  const buttercup = "text-buttercup-400 bg-buttercup-50";
  const gray = "text-gray-500 bg-gray-100";

  if (style === "clear") style = clear;
  else if (style === "magenta") style = magenta;
  else if (style === "pippin") style = pippin;
  else if (style === "rice") style = rice;
  else if (style === "buttercup") style = buttercup;
  else if (style === "gray") style = gray;

  return <span className={`text-sm px-3.5 py-1 rounded-full flex items-center max-w-fit ${style} ${className}`}>{children}</span>;
}

export { Badge };
