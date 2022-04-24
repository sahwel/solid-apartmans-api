import Joi from "joi";
import { CreateReservationDto } from "../../interfaces/Reservation.ts/Definitions";

const validateReservation = (data: CreateReservationDto) => {
  const schema = Joi.object({
    arrive: Joi.required(),
    leave: Joi.required(),
    method: Joi.string().trim(),
    customer: {
      firstName: Joi.string().min(1).max(256).required().trim(),
      lastName: Joi.string().min(1).max(256).required().trim(),
      email: Joi.string().min(1).max(256).required().trim(),
      phone: Joi.string().min(1).max(64).required().trim(),
      taxNumber: Joi.string().min(1).max(128).trim(),
      companyName: Joi.string().min(1).max(256).trim(),
      address: {
        country: Joi.string().min(1).max(256).required().trim(),
        zip_code: Joi.string().min(1).max(256).required().trim(),
        city: Joi.string().min(1).max(256).required().trim(),
        street: Joi.string().min(1).max(256).required().trim(),
        house_number: Joi.number().min(1).required(),
        other: Joi.string()..max(256).trim(),
      },
      numberOfAdults: Joi.number().min(1).required(),
      numberOfKids: Joi.number().min(0),
      underTwoYear: Joi.boolean().required(),
      babyBed: Joi.boolean().required(),
      highChair: Joi.boolean().required(),
      privatePerson: Joi.boolean().required(),
    },
  });
  return schema.validate(data);
};
export default validateReservation;
