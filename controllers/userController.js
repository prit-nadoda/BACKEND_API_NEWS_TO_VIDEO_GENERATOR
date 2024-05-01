import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwt.js";

export const userRegister = catchAsyncError(async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(
      new ErrorHandler("User already registered with given email", 400)
    );
  }
  const newUser = await User.create({
    fullname,
    email,
    password,
  });
  generateToken(newUser, "User registered successfully!", 200, res);
});

export const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect password!", 400));
  }
  generateToken(user, "You are logged in successfully!", 200, res);
});

export const userLogout = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("userToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});
