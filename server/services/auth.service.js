const Util = require("../util/auth");

module.exports.login = async (req, res, next) => {
  try {
    const {
      userid,
      username,
      password,
      address,
      phone,
      fullname,
      active = true,
      roleid,
    } = req.user;

    const tokeninfo = {
      user: {
        userid: userid,
        username: username,
        password: password,
        address: address,
        fullname: fullname,
        phone: phone,
        active: active,
        roleid: roleid,
      },
    };

    const accessToken = Util.generateAccessToken(tokeninfo);

    res.cookie("bkcookie", accessToken, {
      maxAge: 90000000,
      httpOnly: true,
    });
    res.status(200).json({
      token: accessToken,
      username: username,
      userid: userid,
      roleid: roleid,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("bkcookie");
  res.status(200).json({ message: "Logout success" });
};
