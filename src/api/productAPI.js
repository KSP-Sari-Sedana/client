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

async function calculate(id, { tenor, installment, loanFund, interestType }) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}/calc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tenor,
      installment,
      loanFund,
      interestType,
    }),
  });
  res = await res.json();
  return res;
}

export default { get, getById, calculate };
