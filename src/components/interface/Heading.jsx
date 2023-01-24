function Heading({ text, id }) {
  return (
    <h1 id={id} className={`font-darkergrotesque text-center text-6xl font-bold mt-32 mb-8`}>
      {text}
    </h1>
  );
}

export { Heading };
