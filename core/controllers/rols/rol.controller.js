import { connectToDatabase } from "../../database/db_app";
import { mapPaginationResult } from "../../utils/pagination";
import Rol from "../../models/Rol";

export const getRol = async (id) => {
  await connectToDatabase();
  return Rol.findById(id);
};
export const getRols = async (next, previous) => {
  await connectToDatabase();
  const response = await Rol.findPaged({ next, previous });
  return mapPaginationResult(response);
};
export const createRol = async (data) => {
  await connectToDatabase();
  return new Rol(data).save();
};
export const deleteRol = async (id) => {
  await connectToDatabase();
  return Rol.findByIdAndRemove(id);
};
export const updateRol = async (id, data) => {
  await connectToDatabase();
  return Rol.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
};
