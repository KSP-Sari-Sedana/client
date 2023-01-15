async function create(accId, type, data) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/trans/${type}/${accId}`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  res = await res.json();
  return res;
}

async function get(limit) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/trans/?limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  res = await res.json();
  return res;
}

export default { create, get };
