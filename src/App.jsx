import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import RoutesPage from "./pages/Routes";
import Packages from "./pages/Packages";
import RouteDetails from "./pages/RouteDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/route-details" element={<RouteDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
