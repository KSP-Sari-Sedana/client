function Square() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="none" viewBox="0 0 51 51">
      <g clipPath="url(#clip0_525_4133)">
        <rect width="51" height="51" fill="#fff" rx="9"></rect>
        <path stroke="#CECECE" d="M0 -0.5L72.125 -0.5" transform="matrix(.7071 .7071 -.34874 .93722 0 0)"></path>
        <path stroke="#CECECE" d="M0 -0.5L72.125 -0.5" transform="matrix(.7071 -.7071 .34874 .93722 0 51)"></path>
      </g>
      <rect width="50" height="50" x="0.5" y="0.5" stroke="#CECECE" rx="8.5"></rect>
      <defs>
        <clipPath id="clip0_525_4133">
          <rect width="51" height="51" fill="#fff" rx="9"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

const HolderIcon = {
  Square,
};

export { HolderIcon };
