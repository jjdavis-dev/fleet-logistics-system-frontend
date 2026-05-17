const API_URL = "https://johnny.pathway4.click";

export const getRoutes = async () => {
  const res = await fetch(`${API_URL}/routes/`);
  return await res.json();
};

export const addRoute = async (route) => {
  const res = await fetch(`${API_URL}/routes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });

  return await res.json();
};

export const updateRoute = async (id, route) => {
  const res = await fetch(`${API_URL}/routes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });

  return await res.json();
};

export const deleteRoute = async (id) => {
  const res = await fetch(`${API_URL}/routes/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
