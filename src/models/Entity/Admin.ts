import mongoose from "mongoose";
import { stringRequired } from "../../definitions/modelDefinitions";
import { AdminModel } from "../../interfaces/Admin/AdminDtos";

const adminSchema = new mongoose.Schema<AdminModel>({
  email: {
    ...stringRequired,
    max: 256,
    min: 4,
    unique: true,
  },
  password: {
    ...stringRequired,
    min: 8,
    max: 256,
  },
  name: {
    ...stringRequired,
    min: 6,
    unique: true,
    max: 128,
  },
});
export default mongoose.model<AdminModel>("Admin", adminSchema);
