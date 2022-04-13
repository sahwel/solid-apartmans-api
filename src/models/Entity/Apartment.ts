import { string } from "joi";
import mongoose from "mongoose";
import { numberRequired, stringRequired } from "../../helpers/definitions/modelDefinitions";
import { Address, ApartmentModel } from "../../interfaces/Apartment/Definitions";

const apartmentSchema = new mongoose.Schema<ApartmentModel>({
  name: {
    ...stringRequired,
    max: 64,
    min: 1,
    unique: true,
  },
  address: {
    city: {
      ...stringRequired,
      max: 128,
      min: 1,
    },
    zip_code: {
      ...stringRequired,
      max: 32,
      min: 1,
    },
    street: {
      ...stringRequired,
      max: 256,
      min: 1,
    },
    house_number: {
      ...stringRequired,
      max: 256,
      min: 1,
    },
  },
  capacity: {
    capacity: {
      ...numberRequired,
      min: 1,
    },
    bedrooms: {
      ...numberRequired,
      min: 1,
    },
  },
  detailsEN: {
    ...stringRequired,
    max: 1024,
    min: 1,
  },
  detailsHU: {
    ...stringRequired,
    max: 1024,
    min: 1,
  },
  plusPrice: {
    ...numberRequired,
    min: 1,
  },
  price: {
    ...numberRequired,
    min: 1,
  },
  facilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
  ],
  images: [
    {
      ...stringRequired,
    },
  ],
});
export default mongoose.model<ApartmentModel>("Apartment", apartmentSchema);
