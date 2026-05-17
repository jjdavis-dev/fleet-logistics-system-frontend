import { useEffect, useState } from "react";
import {
  getPackages,
  addPackage,
  updatePackage,
  deletePackage,
} from "../services/packageApi";
import { getRoutes } from "../services/routeApi";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [routeId, setRouteId] = useState("");
  const [editId, setEditId] = useState(null);

  const loadPackages = async () => {
    const data = await getPackages();
    setPackages(data);
  };

  const loadRoutes = async () => {
    const data = await getRoutes();
    setRoutes(data);
  };

  useEffect(() => {
    loadPackages();
    loadRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !weight || !routeId) {
      alert("Please fill out all fields.");
      return;
    }

    const pkg = {
      description: description,
      weight: Number(weight),
      route_id: Number(routeId),
    };

    if (editId) {
      await updatePackage(editId, pkg);
      setEditId(null);
    } else {
      await addPackage(pkg);
    }

    setDescription("");
    setWeight("");
    setRouteId("");
    loadPackages();
  };

  const handleEdit = (pkg) => {
    setEditId(pkg.package_id);
    setDescription(pkg.description);
    setWeight(pkg.weight);
    setRouteId(pkg.route_id);
  };

  const handleDelete = async (id) => {
    await deletePackage(id);
    loadPackages();
  };

  return (
    <div className="page">
      <h1>Package Management</h1>
      <p>Add, view, update, and delete package records.</p>

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{editId ? "Update Package" : "Add Package"}</h2>

        <input
          type="text"
          placeholder="Package Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
          <option value="">Select Route ID</option>
          {routes.map((route) => (
            <option key={route.route_id} value={route.route_id}>
              Route {route.route_id} - {route.service_zone}
            </option>
          ))}
        </select>

        <button type="submit">
          {editId ? "Update Package" : "Add Package"}
        </button>
      </form>

      <h2>Package List</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Description</th>
            <th>Weight</th>
            <th>Route ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.package_id}>
              <td>{pkg.package_id}</td>
              <td>{pkg.description}</td>
              <td>{pkg.weight}</td>
              <td>{pkg.route_id}</td>
              <td>
                <button onClick={() => handleEdit(pkg)}>Edit</button>
                <button onClick={() => handleDelete(pkg.package_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Packages;