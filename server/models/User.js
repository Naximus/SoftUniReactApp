const mongoose = require("mongoose");
const { isEmail, isURL, isMobilePhone } = require("validator");

const userShema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true,
    index: {unique: true, sparse: true},
    required: [
      function () {
        return !this.email;
      },
      "Username or email is required.",
    ], // Only required if email is not populated
  },
  email: {
    type: String,
    // unique: true,
    index: {unique: true, sparse: true},
    required: [
      function () {
        return !this.username;
      },
      "Username or email is required.",
    ], // Only required if username is not populated
    validate: {
      validator: isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  type: {
    type: String,
    required: true,
    enum: ['client', 'trainer', 'manager', 'admin']
  },
  image: {
    type: String,
    default: 'https://drive.google.com/uc?export=view&id=1-iyuyLkBLQdUjEiXC76u0yFA_Y3-QmRe',
    // validate: {
    //   validator: () => isURL(`{VALUE}`),
    //   message: "{VALUE} is not a valid URL",
    //   isAsync: false,
    // },
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    validate: {
      validator: isMobilePhone,
      message: "{VALUE} is not a valid phone number",
      isAsync: false
    }
  },
  target: {
    type: String,
    maxLength: [1000, "Target can be no longer that 1000 characters"],
  },
  foodRegime: {
    type: String,
    maxLength: [1000, "Food regime can be no longer that 1000 characters"],
  },
  notes: {
    type: String,
    maxLength: [1000, "Notes can be no longer that 1000 characters"],
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userShema);

module.exports = User;
