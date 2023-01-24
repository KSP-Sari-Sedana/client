function CheckMarkIcon({ isChecked }) {
  return (
    <svg viewBox="0 0 17 12" className="w-2 h-2 mr-2">
      <path
        fill={isChecked ? "#1F73F1" : "#9E9E9E"}
        d="M25.576 11.414a1.386 1.386 0 010 1.996l-9.404 9.176a1.461 1.461 0 01-1.023.414c-.37 0-.74-.139-1.023-.414l-4.701-4.588a1.386 1.386 0 010-1.996 1.47 1.47 0 012.045 0l3.68 3.59 8.38-8.178a1.47 1.47 0 012.046 0z"
        transform="translate(-9 -11)"
      ></path>
    </svg>
  );
}

export { CheckMarkIcon };
