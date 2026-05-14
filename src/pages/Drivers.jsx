import { useEffect, useState } from "react";
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverApi";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [editId, setEditId] = useState(null);

  const loadDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driver = {
      name: name,
      license_type: licenseType,
    };

    if (editId) {
      await updateDriver(editId, driver);
      setEditId(null);
    } else {
      await addDriver(driver);
    }

    setName("");
    setLicenseType("");
    loadDrivers();
  };

  const handleEdit = (driver) => {
    setEditId(driver.driver_id);
    setName(driver.name);
    setLicenseType(driver.license_type);
  };

  const handleDelete = async (id) => {
    await deleteDriver(id);
    loadDrivers();
  };

  return (
    <div className="page">
      <h1>Driver Management</h1>
      <p>Add, view, update, and delete driver records.</p>

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{editId ? "Update Driver" : "Add Driver"}</h2>

        <input
          type="text"
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="License Type"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
        />

        <button type="submit">{editId ? "Update Driver" : "Add Driver"}</button>
      </form>

      <h2>Driver List</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Name</th>
            <th>License Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td>{driver.driver_id}</td>
              <td>{driver.name}</td>
              <td>{driver.license_type}</td>
              <td>
                <button onClick={() => handleEdit(driver)}>Edit</button>
                <button onClick={() => handleDelete(driver.driver_id)}>
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

export default Drivers;