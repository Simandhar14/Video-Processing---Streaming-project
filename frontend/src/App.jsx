import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const hideNav =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
