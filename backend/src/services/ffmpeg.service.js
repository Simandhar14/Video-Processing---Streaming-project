const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const processVideo = (inputPath, onProgress) => {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(
      path.extname(inputPath),
      "_processed.mp4"
    );

    ffmpeg(inputPath)
      .outputOptions("-c copy")
      .on("progress", (progress) => {
        if (progress.percent) {
          onProgress(Math.min(Math.round(progress.percent), 99));
        }
      })
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
};

module.exports = { processVideo };
