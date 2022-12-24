function CheckMarkIcon({ isChecked }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 8 6" className="mr-1">
      <path
        fill={`${isChecked ? "#0F7BD3" : "#9E9E9E"}`}
        fillRule="evenodd"
        d="M7.494.436a.75.75 0 01.07 1.058l-2.87 3.28a1.75 1.75 0 01-2.41.214L.532 3.586a.75.75 0 11.937-1.172L3.22 3.817a.25.25 0 00.345-.031l2.87-3.28a.75.75 0 011.058-.07z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export { CheckMarkIcon };
