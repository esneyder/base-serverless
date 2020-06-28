import mongoose from "mongoose";
import pagination from "typegoose-cursor-pagination";
export const rolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: [true, "role name is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    resource: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
rolSchema.plugin(pagination);
export default mongoose.model("rol", rolSchema);
