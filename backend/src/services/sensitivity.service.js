const analyzeSensitivity = async () => {
  await new Promise((res) => setTimeout(res, 2000));

  return Math.random() > 0.3 ? "safe" : "flagged";
};

module.exports = { analyzeSensitivity };
