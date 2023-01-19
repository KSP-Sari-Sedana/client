async function getSummary() {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  res = await res.json();
  return res;
}

export default { getSummary };
