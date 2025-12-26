import { useState, useEffect } from "react";
import api from "../api/axios";
import socket from "../socket/socket";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socket.on("processing-progress", (data) => {
      setProgress(data.progress);
    });

    return () => socket.off("processing-progress");
  }, []);

  const upload = async () => {
    if (!file) {
      alert("Please choose a file first");
      return;
    }

    const form = new FormData();
    form.append("video", file);
    form.append("title", file.name);

    await api.post("/videos/upload", form, {
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
  };

  return (
    <div className="card">
      <h2>Upload Video</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "16px" }}
      />

      <button onClick={upload} style={{ marginBottom: "16px" }}>
        Upload
      </button>

      {progress > 0 && (
        <div>
          <p>Progress: {progress}%</p>
          <progress value={progress} max="100" style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
