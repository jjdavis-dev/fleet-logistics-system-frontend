const API_URL = "https://johnny.pathway4.click";

export const getDrivers = async () => {
  const res = await fetch(`${API_URL}/drivers/`);
  return await res.json();
};

export const addDriver = async (driver) => {
  const res = await fetch(`${API_URL}/drivers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });

  return await res.json();
};

export const updateDriver = async (id, driver) => {
  const res = await fetch(`${API_URL}/drivers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });

  return await res.json();
};

export const deleteDriver = async (id) => {
  const res = await fetch(`${API_URL}/drivers/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
