import mongoose from "mongoose";
import { numberRequired, stringRequired } from "../../helpers/definitions/modelDefinitions";
import { Facility } from "../../interfaces/Apartment/Definitions";

const facilitySchema = new mongoose.Schema<Facility>({
  nameHU: {
    ...stringRequired,
    max: 64,
    min: 1,
    unique: true,
  },
  nameEN: {
    ...stringRequired,
    max: 64,
    min: 1,
    unique: true,
  },
  url: {
    ...stringRequired,
    min: 1,
  },
});
export default mongoose.model<Facility>("Facility", facilitySchema);
