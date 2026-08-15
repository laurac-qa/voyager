import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Trips from "./pages/Trips";
import About from "./pages/About";
import Login from "./pages/Login";
import TripDetails from "./pages/TripDetails";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:tripId/edit" element={<EditTrip />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trips/:tripId" element={<TripDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;