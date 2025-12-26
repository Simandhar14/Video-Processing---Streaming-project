const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const videoRoutes = require("./routes/video.routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
