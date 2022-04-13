import { boolean, string } from "joi";
import mongoose from "mongoose";
import { numberRequired, stringRequired } from "../../helpers/definitions/modelDefinitions";
import { ReservationModel } from "../../interfaces/Reservation.ts/Definitions";

const reservationSchema = new mongoose.Schema<ReservationModel>({
  arrive: {
    type: Date,
    required: true,
  },
  leave: {
    type: Date,
    required: true,
  },
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  customer: {
    firstName: { ...stringRequired, min: 1, max: 256 },
    lastName: { ...stringRequired, min: 1, max: 256 },
    email: { ...stringRequired, min: 1, max: 256 },
    phone: { ...stringRequired, min: 1, max: 64 },
    taxNumber: { type: String, trim: true, min: 0, max: 128 },
    companyName: { type: String, trim: true, min: 0, max: 256 },
    address: {
      country: { ...stringRequired, min: 1, max: 256 },
      zip_code: { ...stringRequired, min: 1, max: 256 },
      city: { ...stringRequired, min: 1, max: 256 },
      street: { ...stringRequired, min: 1, max: 256 },
      house_number: { ...numberRequired, min: 1 },
      other: { type: String, trim: true, min: 1, max: 256 },
    },
    numberOfAdults: { ...numberRequired, min: 1 },
    numberOfKids: { ...numberRequired, min: 0 },
    underTwoYear: { type: Boolean, required: true, default: false },
    babyBed: { type: Boolean, required: true, default: false },
    highChair: { type: Boolean, required: true, default: false },
    privatePerson: { type: Boolean, required: true, default: false },
  },
});
export default mongoose.model<ReservationModel>("Reservation", reservationSchema);
