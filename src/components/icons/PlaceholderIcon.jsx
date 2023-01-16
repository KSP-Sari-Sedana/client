function Square() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 52 52">
      <g clipPath="url(#clip0_525_4133)">
        <rect width="50" height="50" fill="#fff" rx="9"></rect>
        <path stroke="#CECECE" d="M0 -0.5L72.125 -0.5" transform="matrix(.7071 .7071 -.34874 .93722 0 0)"></path>
        <path stroke="#CECECE" d="M0 -0.5L72.125 -0.5" transform="matrix(.7071 -.7071 .34874 .93722 0 50)"></path>
      </g>
      <rect width="50" height="50" x="0.5" y="0.5" stroke="#CECECE" rx="8.5"></rect>
      <defs>
        <clipPath id="clip0_525_4133">
          <rect width="50" height="50" fill="#fff" rx="9"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function Rectangle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="93" fill="none" viewBox="0 0 144 93">
      <g clipPath="url(#clip0_775_4752)">
        <path fill="#fff" d="M0 12C0 5.373 5.373 0 12 0h120c6.627 0 12 5.373 12 12v69c0 6.627-5.373 12-12 12H12C5.373 93 0 87.627 0 81V12z"></path>
        <path stroke="#EAECF0" d="M0 -0.5L171.421 -0.5" transform="matrix(.84004 .54253 -.49922 .86647 0 0)"></path>
        <path stroke="#EAECF0" d="M0 -0.5L171.421 -0.5" transform="matrix(.84004 -.54253 .49922 .86647 0 93)"></path>
      </g>
      <path stroke="#EAECF0" d="M12 .5h120c6.351 0 11.5 5.149 11.5 11.5v69c0 6.351-5.149 11.5-11.5 11.5H12C5.649 92.5.5 87.351.5 81V12C.5 5.649 5.649.5 12 .5z"></path>
      <defs>
        <clipPath id="clip0_775_4752">
          <path fill="#fff" d="M0 12C0 5.373 5.373 0 12 0h120c6.627 0 12 5.373 12 12v69c0 6.627-5.373 12-12 12H12C5.373 93 0 87.627 0 81V12z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

const HolderIcon = {
  Square,
  Rectangle,
};

export { HolderIcon };
