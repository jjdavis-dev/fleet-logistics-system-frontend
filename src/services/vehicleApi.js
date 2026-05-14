const API_URL = "https://johnny.pathway4.click";

export const getVehicles = async () => {
  const res = await fetch(`${API_URL}/vehicles/`);
  return await res.json();
};

export const addVehicle = async (vehicle) => {
  const res = await fetch(`${API_URL}/vehicles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });

  return await res.json();
};

export const updateVehicle = async (id, vehicle) => {
  const res = await fetch(`${API_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });

  return await res.json();
};

export const deleteVehicle = async (id) => {
  const res = await fetch(`${API_URL}/vehicles/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
