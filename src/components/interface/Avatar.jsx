function Avatar({ action }) {
  return (
    <div onClick={action} className={`flex justify-center overflow-hidden items-center w-12 h-12 bg-gray-300 rounded-[21px] ${action && "cursor-pointer"} `}>
      <img src="assets/avatar.svg" alt="Profile Icon" />
    </div>
  );
}

export { Avatar };
