import mongoose, { Schema } from "mongoose";
import pagination from "typegoose-cursor-pagination";
const options = { discriminatorKey: "kind", timestamps: true };
import Rol from "../../core/models/Rol";
export const modelSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 1,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      minlength: 1,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      minlength: 1,
      required: [true, "email  is required"],
    },
    rol_id: [
      {
        type: Schema.Types.ObjectId,
        ref: Rol.modelName,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const clientSchema = new Schema(
  {
    full_name: {
      type: String,
      minlength: 1,
      required: [true, "full_name  ir required"],
    },
    phone: {
      type: String,
      minlength: 1,
      required: [true, "phone is required"],
    },
  },
  options
);
modelSchema.plugin(pagination);
const User = mongoose.model("user", modelSchema);
export const UserClient = User.discriminator("client_user", clientSchema);
export default User;
