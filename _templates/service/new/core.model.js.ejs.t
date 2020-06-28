---
to: core/models/<%= h.changeCase.pascal(h.inflection.singularize(name)) %>.js
---
import mongoose  from "mongoose"
import pagination from "typegoose-cursor-pagination";
export const modelSchema = new mongoose.Schema(
  {
     
    name: {
      type: String,
      minlength: 1,
      required: [true, "Name is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
modelSchema.plugin(pagination);
export default mongoose.model("<%= h.inflection.singularize(name) %>", modelSchema);