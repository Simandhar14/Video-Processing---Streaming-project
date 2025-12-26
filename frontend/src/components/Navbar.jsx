import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h3>Video Portal</h3>
        <div className="nav-links">
          <Link to="/upload">Upload</Link>
          <Link to="/library">My Videos</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
