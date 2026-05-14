import { useEffect, useState } from "react";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleApi";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("");
  const [editId, setEditId] = useState(null);

  const loadVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicle = {
      license_plate: licensePlate,
      model: model,
    };

    if (editId) {
      await updateVehicle(editId, vehicle);
      setEditId(null);
    } else {
      await addVehicle(vehicle);
    }

    setLicensePlate("");
    setModel("");
    loadVehicles();
  };

  const handleEdit = (vehicle) => {
    setEditId(vehicle.vehicle_id);
    setLicensePlate(vehicle.license_plate);
    setModel(vehicle.model);
  };

  const handleDelete = async (id) => {
    await deleteVehicle(id);
    loadVehicles();
  };

  return (
    <div className="page">
      <h1>Vehicle Management</h1>
      <p>Add, view, update, and delete vehicle records.</p>

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{editId ? "Update Vehicle" : "Add Vehicle"}</h2>

        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      <h2>Vehicle List</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>License Plate</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.license_plate}</td>
              <td>{vehicle.model}</td>
              <td>
                <button onClick={() => handleEdit(vehicle)}>Edit</button>
                <button onClick={() => handleDelete(vehicle.vehicle_id)}>
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

export default Vehicles;