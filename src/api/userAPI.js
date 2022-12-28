async function register(username, email, firstName, lastName, password) {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify({ username, email, firstName, lastName, password }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  result = await result.json();
  return result;
}

export default { register };
