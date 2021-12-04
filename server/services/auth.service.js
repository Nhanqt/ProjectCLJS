const Util = require("../util/auth");

module.exports.login = async (req, res, next) => {
  try {
    const { _id, userName, fullName, role, age, phone } = req.user;

    const tokeninfo = {
      user: {
        id: _id,
        userName: userName,
        fullName: fullName,
        role: role,
        age: age,
        phone: phone,
      },
    };

    const accessToken = Util.generateAccessToken(tokeninfo);

    res.cookie("bkcookie", accessToken, {
      maxAge: 90000000,
      httpOnly: true,
    });
    res.status(200).json({
      token: accessToken,
      userName: userName,
      id: _id,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("bkcookie");
  res.status(200).json({ message: "Đăng xuất thành công" });
};
