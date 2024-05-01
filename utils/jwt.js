export const generateToken = (newUser, message, statusCode, res) => {
  const token = newUser.generateAuthToken();
  const cookieName = "userToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: message,
      newUser,
      token: token,
      cookieName: cookieName,
    });
};
