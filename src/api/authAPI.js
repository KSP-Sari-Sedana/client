async function login(email, password) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  res = await res.json();
  return res;
}

export default { login };
