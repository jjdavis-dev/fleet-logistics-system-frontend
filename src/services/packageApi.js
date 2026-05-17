const API_URL = "https://johnny.pathway4.click";

export const getPackages = async () => {
  const res = await fetch(`${API_URL}/packages/`);
  return await res.json();
};

export const addPackage = async (pkg) => {
  const res = await fetch(`${API_URL}/packages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pkg),
  });

  return await res.json();
};

export const updatePackage = async (id, pkg) => {
  const res = await fetch(`${API_URL}/packages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pkg),
  });

  return await res.json();
};

export const deletePackage = async (id) => {
  const res = await fetch(`${API_URL}/packages/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
