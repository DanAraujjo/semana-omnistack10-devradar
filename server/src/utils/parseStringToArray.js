module.exports = function parseStringToArray(string) {
  return string.split(",").map(item => item.trim());
};
