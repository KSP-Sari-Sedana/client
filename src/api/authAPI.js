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

async function isTokenValid() {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  if (res.status === "OK") {
    return true;
  } else {
    return false;
  }
}

export default { login, isTokenValid };
