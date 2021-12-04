const { User } = require("../models/user.model");
const Util = require("../util/hash");

module.exports.signUp = async (req, res, next) => {
  try {
    const {
      userName,
      password,
      fullName,
      role = "member",
      age,
      phone,
    } = req.body;

    await User.create({ userName, password, fullName, role, age, phone });

    res.status(200).json({ message: "Đăng ký thành công" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const listUsers = await User.find({ role: "member" });

    res.status(200).json(listUsers);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const { userName } = req.user.user;

    const result = await User.findOne({ userName });

    const user = {
      _id: result._id,
      userName: result.userName,
      fullName: result.fullName,
      age: result.age,
      phone: result.phone,
      role: result.role,
      status: result.status,
    };

    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    await User.findByIdAndUpdate(
      id,
      { status: status },
      {
        useFindAndModify: false,
      }
    );

    res
      .status(200)
      .json({ message: "Thay đổi trạng thái tài khoản thành công" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.role) {
      return res.status(400).json({ message: "Không thể thay đổi thông tin" });
    }
    const { id } = req.user.user;

    await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    res.status(200).json({ message: "Cập nhật thông tin thành công" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    const { userName, id } = req.user.user;
    const { password_current, password } = req.body;

    const infoUser = await User.findOne({ userName });

    const isCurrentPasswordCorrect = await Util.checkHashString(
      password_current,
      infoUser.password
    );

    if (!isCurrentPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu cũ không đúng" });
    } else {
      const hashedPassword = await Util.generateHashString(password);

      await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        {
          useFindAndModify: false,
        }
      );

      res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};
