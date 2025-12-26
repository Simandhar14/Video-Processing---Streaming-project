const Video = require("../models/Video");
const { processVideo } = require("./ffmpeg.service");
const { analyzeSensitivity } = require("./sensitivity.service");
const { getIO } = require("../config/socket");

const startProcessing = async (video) => {
  const io = getIO();

  await Video.findByIdAndUpdate(video._id, {
    status: "processing",
  });

  io.to(video.tenant.toString()).emit("processing-started", {
    videoId: video._id,
  });

  await processVideo(video.filepath, (percent) => {
    io.to(video.tenant.toString()).emit("processing-progress", {
      videoId: video._id,
      progress: percent,
    });
  });

  const result = await analyzeSensitivity();

  await Video.findByIdAndUpdate(video._id, {
    status: result,
  });

  io.to(video.tenant.toString()).emit("processing-completed", {
    videoId: video._id,
    status: result,
  });
};

module.exports = { startProcessing };
