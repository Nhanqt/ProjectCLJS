const { User } = require("../models/user.model");
const Util = require("../util/hash");

module.exports.checkUserNameDuplicate = async (req, res, next) => {
  try {
    const { userName } = req.body;

    const result = await User.findOne({ userName });

    if (result)
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    else return next();
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.checkUserNameExist = async (req, res, next) => {
  try {
    const userName = req.body.userName.toLowerCase();

    const result = await User.findOne({ userName });
    
    if (!result)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    else if (result.status === false)
      return res.status(400).json({ message: "Tài khoản đã bị khoá. Vui lòng liên hệ admin" });
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
    const { password } = req.user;

    const isPasswordMatched = await Util.checkHashString(
      req.body.password,
      password
    );

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
