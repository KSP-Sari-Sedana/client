async function get(status, role) {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users/filter/all?status=${status}&role=${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  result = await result.json();
  return result;
}

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

async function update(payload) {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  result = await result.json();
  return result;
}

async function getMyProfile() {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  result = await result.json();
  return result;
}

async function getByUsername(username) {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  result = await result.json();
  return result;
}

async function setStatusAndRole(username, status, role) {
  let result = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${username}`, {
    method: "PUT",
    body: JSON.stringify({ status, role }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  result = await result.json();
  return result;
}

export default { get, register, update, getMyProfile, getByUsername, setStatusAndRole };
