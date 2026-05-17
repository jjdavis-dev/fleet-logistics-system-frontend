import { useEffect, useState } from "react";
import {
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
} from "../services/routeApi";

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [routeDate, setRouteDate] = useState("");
  const [serviceZone, setServiceZone] = useState("");
  const [driverId, setDriverId] = useState("");
  const [editId, setEditId] = useState(null);

  const loadRoutes = async () => {
    const data = await getRoutes();
    setRoutes(data);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!routeDate || !serviceZone || !driverId) {
      alert("Please fill out all fields.");
      return;
    }

    const route = {
      route_date: routeDate,
      service_zone: serviceZone,
      driver_id: Number(driverId),
    };

    if (editId) {
      await updateRoute(editId, route);
      setEditId(null);
    } else {
      await addRoute(route);
    }

    setRouteDate("");
    setServiceZone("");
    setDriverId("");
    loadRoutes();
  };

  const handleEdit = (route) => {
    setEditId(route.route_id);
    setRouteDate(new Date(route.route_date).toISOString().split("T")[0]);
    setServiceZone(route.service_zone);
    setDriverId(route.driver_id);
  };

  const handleDelete = async (id) => {
    await deleteRoute(id);
    loadRoutes();
  };

  return (
    <div className="page">
      <h1>Delivery Routes</h1>
      <p>Add, view, update, and delete delivery route records.</p>

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{editId ? "Update Route" : "Add Route"}</h2>

        <input
          type="date"
          value={routeDate}
          onChange={(e) => setRouteDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Service Zone"
          value={serviceZone}
          onChange={(e) => setServiceZone(e.target.value)}
        />

        <input
          type="number"
          placeholder="Driver ID"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />

        <button type="submit">{editId ? "Update Route" : "Add Route"}</button>
      </form>

      <h2>Route List</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Date</th>
            <th>Service Zone</th>
            <th>Driver ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((route) => (
            <tr key={route.route_id}>
              <td>{route.route_id}</td>
              <td>{route.route_date}</td>
              <td>{route.service_zone}</td>
              <td>{route.driver_id}</td>
              <td>
                <button onClick={() => handleEdit(route)}>Edit</button>
                <button onClick={() => handleDelete(route.route_id)}>
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

export default Routes;
