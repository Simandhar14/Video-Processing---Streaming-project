const fs = require("fs");
const Video = require("../models/Video");

/**
 * GET /videos
 */
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ tenant: req.tenantId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

/**
 * POST /videos/upload
 */
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("REQ.FILE:", req.file);

    const video = await Video.create({
      title: req.file.originalname,
      path: req.file.path,
      tenant: req.tenantId,
      owner: req.user.userId,
      status: "uploaded",
    });

    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

/**
 * GET /videos/stream/:id
 */
exports.streamVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video || !video.path) {
      return res.status(404).send("Video not found");
    }

    const stat = fs.statSync(video.path);
    const range = req.headers.range;
    if (!range) return res.sendStatus(416);

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + 1024 * 1024, stat.size - 1);

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(video.path, { start, end }).pipe(res);
  } catch (err) {
    console.error("STREAM ERROR:", err);
    res.sendStatus(500);
  }
};
