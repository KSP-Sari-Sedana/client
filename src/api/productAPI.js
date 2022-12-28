async function get() {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
  res = await res.json();
  return res;
}

async function getById(id) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
  res = await res.json();
  return res;
}

export default { get, getById };
