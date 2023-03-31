let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    full_name: String,
    account_name: String,
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
