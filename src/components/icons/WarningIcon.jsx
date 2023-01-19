function Triangle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none" viewBox="0 0 22 20">
      <circle cx="11" cy="15" r="1" fill="currentColor"></circle>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 7v5m-7.672 7h15.344c1.773 0 2.893-1.857 2.032-3.368L13.032 2.166C12.146.61 9.854.61 8.968 2.166L1.296 15.632C.436 17.143 1.556 19 3.328 19z"
      ></path>
    </svg>
  );
}

const WarningIcon = {
  Triangle,
};

export { WarningIcon };
