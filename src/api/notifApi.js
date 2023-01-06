async function getByUser() {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/notif`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  return res;
}

export default { getByUser };
