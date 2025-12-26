const analyzeSensitivity = async () => {
  // Simulate ML / AI processing delay
  await new Promise((res) => setTimeout(res, 2000));

  // Random classification (mock)
  return Math.random() > 0.3 ? "safe" : "flagged";
};

module.exports = { analyzeSensitivity };
