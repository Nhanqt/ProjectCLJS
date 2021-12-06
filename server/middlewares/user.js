const { User } = require("../models/user.model");
const Util = require("../util/hash");
const db = require("../util/database");

module.exports.checkUserNameDuplicate = async (req, res, next) => {
  try {
    const { username } = req.body;

    const result = await db.query(
      "select username from tbl_users where username = $1",
      [username]
    );
    if (result.rows[0]) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    } else {
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.checkUserNameExist = async (req, res, next) => {
  try {
    const userName = req.body.username;
    const result = await db.query(
      "select username from tbl_users where username = $1",
      [userName]
    );
    if (!result)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    else if (result.status === false)
      return res
        .status(400)
        .json({ message: "Tài khoản đã bị khoá. Vui lòng liên hệ admin" });
    else {
      req.user = result;
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.checkPassWordMatched = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashed = await Util.generateHashString(password);
    const isPasswordMatched = await Util.checkHashString(
      req.body.password,
      hashed
    );

    console.log(hashed);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      res.status(400).json({ message: "Mật khẩu không đúng" });
    } else {
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};
