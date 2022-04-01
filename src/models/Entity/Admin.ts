import mongoose from "mongoose";
import { stringRequired } from "../../helpers/definitions/modelDefinitions";
import { AdminModel } from "../../interfaces/Admin/Definitions";

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
    max: 128,
  },
});
export default mongoose.model<AdminModel>("Admin", adminSchema);
