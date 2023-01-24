function Medium() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="61" fill="none" viewBox="0 0 34 62">
      <rect width="5.231" height="29.423" x="14.385" y="30.731" fill="#C9C9C9" rx="2.615"></rect>
      <circle cx="17" cy="17" r="17" fill="#DC0721"></circle>
    </svg>
  );
}

function Small() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="41" fill="none" viewBox="0 0 24 41">
      <rect width="3.565" height="20.054" x="9.804" y="20.946" fill="#C9C9C9" rx="1.783"></rect>
      <circle cx="11.587" cy="11.587" r="11.587" fill="#DC0721"></circle>
    </svg>
  );
}

const PinIcon = {
  Medium,
  Small,
};

export { PinIcon };
