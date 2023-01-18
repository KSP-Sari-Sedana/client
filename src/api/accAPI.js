async function setStatus(type, id, status) {
  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/acc/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });
  res = await res.json();
}

export default { setStatus };
