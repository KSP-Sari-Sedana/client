async function get(type) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/subm/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  return res;
}

async function getByUser() {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/subm`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  return res;
}

async function getSubmById(id, type) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/subm/${type}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  return res;
}

export default { get, getByUser, getSubmById };
