import { connectToDatabase } from "../../database/db_app";
import User, { UserClient } from "../../models/User";
import Rol from "../../models/Rol";

export const createAdmin = async (user, hashedPassword) => {
  await connectToDatabase();
  const rolId = await Rol.findOne({ name: "Administrator" }).exec();
  return new User({ ...user, password: hashedPassword, rol_id: rolId }).save();
};

export const createClient = async (user, hashedPassword) => {
  await connectToDatabase();
  const rolId = await Rol.findOne({ name: "Client" }).exec();
  return new UserClient({
    ...user,
    password: hashedPassword,
    rol_id: rolId,
  }).save();
};

export const existUser = async ({ email, username, phone }) => {
  await connectToDatabase();
  const user = await User.findOne({
    $or: [
      { username },
      { email: { $exists: true, $eq: email } },
      { phone: { $exists: true, $eq: phone } },
    ],
  }).exec();

  return !!user;
};

export const getUserPassFromUserName = async (username) => {
  await connectToDatabase();
  if (username) return User.findOne({ username });
  throw new Error(
    "Function get controller user was called without specifying username"
  );
};
