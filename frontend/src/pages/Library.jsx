import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Library() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/videos").then((res) => setVideos(res.data));
  }, []);

  if (!videos.length) {
    return <p>No videos uploaded yet.</p>;
  }

  return (
    <div>
      <h2>My Videos</h2>
      {videos.map((v) => (
        <div key={v._id} style={{ marginBottom: "12px" }}>
          <strong>{v.title}</strong>
          <p>Status: {v.status}</p>
          <Link to={`/player/${v._id}`}>Play</Link>
        </div>
      ))}
    </div>
  );
}
