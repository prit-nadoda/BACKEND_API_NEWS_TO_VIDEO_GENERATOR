import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookie.userToken;
  if (!token) {
    return next(new ErrorHandler("User is Not Authenticated!", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decode._id);
  next();
});
