import { useEffect, useState } from "react";
import { getRoutes } from "../services/routeApi";
import { getPackages } from "../services/packageApi";

function RouteDetails() {
  const [routes, setRoutes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");

  const loadData = async () => {
    const routeData = await getRoutes();
    const packageData = await getPackages();

    setRoutes(routeData);
    setPackages(packageData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPackages = packages.filter(
    (pkg) => pkg.route_id === Number(selectedRoute),
  );

  return (
    <div className="page">
      <h1>Route Details</h1>
      <p>Select a route to view all packages assigned to it.</p>

      <form className="form-box">
        <h2>Select Route</h2>

        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
        >
          <option value="">Select Route ID</option>

          {routes.map((route) => (
            <option key={route.route_id} value={route.route_id}>
              Route {route.route_id} - {route.service_zone}
            </option>
          ))}
        </select>
      </form>

      <h2>Associated Packages</h2>

      {selectedRoute === "" ? (
        <p>Please select a route.</p>
      ) : filteredPackages.length === 0 ? (
        <p>No packages assigned to this route.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Description</th>
              <th>Weight</th>
              <th>Route ID</th>
            </tr>
          </thead>

          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg.package_id}>
                <td>{pkg.package_id}</td>
                <td>{pkg.description}</td>
                <td>{pkg.weight}</td>
                <td>{pkg.route_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RouteDetails;
