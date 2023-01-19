function Dart({ aim }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 10" className="ml-2">
      <path
        fill="currentColor"
        fillRule="evenodd"
        transform={`${aim === "rightTop" && "rotate(-45 7 5)"}`}
        d="M13.53 5.53a.75.75 0 000-1.06l-4-4a.75.75 0 00-1.06 1.06l2.72 2.72H1a.75.75 0 000 1.5h10.19L8.47 8.47a.75.75 0 001.06 1.06l4-4z"
        clipRule="evenodd"
        opacity="0.4"
      ></path>
      <path
        transform={`${aim === "rightTop" && "rotate(-45 7 5)"}`}
        fill="currentColor"
        d="M13.53 4.47a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06-1.06l3.5-3.467-3.5-3.473A.75.75 0 019.53.47l4 4z"
      ></path>
    </svg>
  );
}

function Head() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6">
      <path fill="#28303F" fillRule="evenodd" d="M.414.532A.75.75 0 011.47.414L6 4.04 10.531.414a.75.75 0 11.938 1.172l-5 4a.75.75 0 01-.937 0l-5-4A.75.75 0 01.414.532z" clipRule="evenodd"></path>
    </svg>
  );
}

const ArrowIcon = {
  Dart,
  Head,
};

export { ArrowIcon };
