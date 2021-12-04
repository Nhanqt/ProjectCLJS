const jwt = require("jsonwebtoken");

const Config = require("../config/auth");

module.exports.authenticateToken = async (req, res, next) => {
  try {
    let token = req.cookies["bkcookie"];

    token = token == null ? req.headers.authorization : token;

    if (token == null)
      return res
        .status(401)
        .json({ message: "Token không hợp lệ, vui lòng đăng nhập lại" });
    token = token.replace("Bearer ", "");

    jwt.verify(token, Config.access_token_secret, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại" });
      }

      req.user = user;
      next();
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.authenticateRole = async (req, res, next) => {
  try {
    const { role } = req.user.user;
    if (role !== "admin") {
      return res.status(403).json({ message: "Không đủ quyền truy cập" });
    } else {
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};
