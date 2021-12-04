const mongoose = require("mongoose");
const Util = require("../util/hash");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Tên đăng nhập không được để trống"],
  },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  accessToken: { type: String, default: "" },
  refreshToken: { type: String, default: "" },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hashed = await Util.generateHashString(user.password);

  if (hashed) {
    user.password = hashed;
    next();
  }
});

const User = mongoose.model("users", UserSchema, "users");

module.exports = {
  UserSchema,
  User,
};
