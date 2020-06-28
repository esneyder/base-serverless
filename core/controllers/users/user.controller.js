import { connectToDatabase } from "../../database/db_app";
import { mapPaginationResult } from "../../utils/pagination";
import User from "../../models/User";
import Rol from "../../models/Rol";
export const getUser = async (id) => {
  await connectToDatabase();
  return User.findById(id);
};
export const getUsers = async (next, previous) => {
  await connectToDatabase();
  const response = await User.findPaged({ next, previous }, null, null, {
    path: "rol_id",
    model: Rol.modelName,
  });
  return mapPaginationResult(response);
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
