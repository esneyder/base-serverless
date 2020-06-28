import { connectToDatabase } from "../../database/db_app";
import { mapPaginationResult } from "../../utils/pagination";
import User from "../../models/User";

export const getUser = async (id) => {
  await connectToDatabase();
  return User.findById(id);
};
export const getUsers = async (next, previous) => {
  await connectToDatabase();
  const response = await User.findPaged({ next, previous });
  return mapPaginationResult(response);
};
export const createUser = async (data) => {
  await connectToDatabase();
  return new User(data).save();
};
export const deleteUser = async (id) => {
  await connectToDatabase();
  return User.findByIdAndRemove(id);
};
export const updateUser = async (id, data) => {
  await connectToDatabase();
  return User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
};
