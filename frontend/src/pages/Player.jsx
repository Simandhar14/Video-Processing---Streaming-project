import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Player() {
  const { id } = useParams();
  const { token } = useAuth();

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
    >
      <video controls width="800">
        <source
          src={`http://localhost:5000/videos/stream/${id}?token=${token}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
