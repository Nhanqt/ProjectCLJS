const Util = require("../util/hash");
const db = require("../util/database");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await db.query(`select * from tbl_users`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const {
      username,
      password,
      address,
      phone,
      fullname,
      active = true,
      roleid = 2,
    } = req.body;
    const hashed = await Util.generateHashString(password);
    if (
      !req.body.address ||
      !req.body.username ||
      !req.body.phone ||
      !req.body.fullname
    ) {
      res.status(400).json({ message: "Error with param" });
    } else {
      await db.query(
        "INSERT INTO tbl_users (username,password,address,phone,fullname,active,roleid) values ($1,$2,$3,$4,$5,$6,$7)",
        [username, hashed, address, phone, fullname, active, roleid]
      );
      res.status(200).json({ message: "Sign Up success!" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};

// module.exports.getMe = async (req, res, next) => {
//   try {
//     const { userName } = req.user.user;

//     const result = await User.findOne({ userName });

//     const user = {
//       _id: result._id,
//       userName: result.userName,
//       fullName: result.fullName,
//       age: result.age,
//       phone: result.phone,
//       role: result.role,
//       status: result.status,
//     };

//     res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).json({ message: e.message });
//   }
// };

// module.exports.updateUserStatus = async (req, res, next) => {
//   try {
//     const { id, status } = req.body;

//     await User.findByIdAndUpdate(
//       id,
//       { status: status },
//       {
//         useFindAndModify: false,
//       }
//     );

//     res
//       .status(200)
//       .json({ message: "Thay đổi trạng thái tài khoản thành công" });
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).json({ message: e.message });
//   }
// };

// module.exports.updateUser = async (req, res, next) => {
//   try {
//     if (req.body.role) {
//       return res.status(400).json({ message: "Không thể thay đổi thông tin" });
//     }
//     const { id } = req.user.user;

//     await User.findByIdAndUpdate(id, req.body, {
//       useFindAndModify: false,
//     });

//     res.status(200).json({ message: "Cập nhật thông tin thành công" });
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).json({ message: e.message });
//   }
// };

// module.exports.updatePassword = async (req, res, next) => {
//   try {
//     const { userName, id } = req.user.user;
//     const { password_current, password } = req.body;

//     const infoUser = await User.findOne({ userName });

//     const isCurrentPasswordCorrect = await Util.checkHashString(
//       password_current,
//       infoUser.password
//     );

//     if (!isCurrentPasswordCorrect) {
//       return res.status(403).json({ message: "Mật khẩu cũ không đúng" });
//     } else {
//       const hashedPassword = await Util.generateHashString(password);

//       await User.findByIdAndUpdate(
//         id,
//         { password: hashedPassword },
//         {
//           useFindAndModify: false,
//         }
//       );

//       res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
//     }
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).json({ message: e.message });
//   }
// };
