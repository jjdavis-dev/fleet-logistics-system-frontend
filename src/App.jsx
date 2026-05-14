import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;