import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [5, "Fullname Must Constain Atleast 5 Characters!"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Registered!"],
    validate: [validator.isEmail, "Please Enter a Valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [8, "Password must consist at least 8 characters!"],
    select: false,
  },
  videos: [
    {
      headLine: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("users", userSchema);
