import mongoose from "mongoose";
import { numberRequired, stringRequired } from "../../helpers/definitions/modelDefinitions";
import { Review } from "../../interfaces/Apartment/Definitions";

const reviewSchema = new mongoose.Schema<Review>(
  {
    customer: {
      ...stringRequired,
      min: 1,
    },
    review: {
      ...stringRequired,
      min: 1,
      max: 512,
      required: true,
    },
    stars: {
      ...numberRequired,
      min: 1,
      max: 5,
    },
    timeAgo: {
      type: Date,
      required: true,
    },
  },
  { collection: "reviews" }
);
export default mongoose.model<Review>("Review", reviewSchema);
