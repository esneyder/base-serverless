export const hashPassword = async (password, bcrypt) => {
  return await bcrypt.hash(password, 10);
};
export const createToken = async (user, jwt) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.LARGE_EXPIRE,
  });
};
export const comparePassword = async (passsend, currentpass, bcrypt) => {
  return await bcrypt.compare(passsend, currentpass);
};
