const crypto = require("crypto");

module.exports = password => {
  return crypto
    .createHmac("sha256", "pass")
    .update(password)
    .digest("hex");
};
