const baseUrl = "http://localhost:3030";

export const login = async (usernameOrEmail, password) => {
  const result = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({usernameOrEmail, password}),
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .catch((error) => {
    return error;
  });
  // const result = await response.json();
  return result;
};
