import { GetSimpleDateString, setToZero } from "../helpers/services/dateFormating";
import { CreateReservationDto, ReservationCRUD } from "../interfaces/Reservation.ts/Definitions";
import ApiResponse from "../models/ApiResponse";
import Apartment from "../models/Entity/Apartment";
import Reservation from "../models/Entity/Reservation";
import validateReservation from "../validation/Reservation/ReservationValidationt";

class ReservationServices implements ReservationCRUD {
  async create(id: string, data: CreateReservationDto) {
    try {
      if (!id) return new ApiResponse({ msg: "Param id is required! (Paraméter id kötelező!)" });
      const dataValidation = validateReservation(data);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      const apartment = await Apartment.findById(id).select("name reservations").populate("reservations");

      if (!apartment) return new ApiResponse({ msgHU: "Apartman nem található!", msgEN: "Apartment not found" }, 404);

      const newArrive = setToZero(data.arrive);
      const newLeave = setToZero(data.leave);

      if (!checkArriveDate(newArrive))
        return new ApiResponse({
          msgHU: "Az érekzés napja legalább, a foglalás időpontja után 1 nappal kell, hogy legyen!",
          msgEN: "The arrive date is must be after the date of booking",
        });

      if (!data.customer.privatePerson) {
        if (!data.customer.companyName || data.customer.companyName.length === 0)
          return new ApiResponse({
            msgHU: "Ha mint cég akar folgalni, akkor kötelező megadnia a cég nevét!",
            msgEN: "If you want to book as company, then you must enter the name of the company!",
          });

        if (!data.customer.taxNumber)
          return new ApiResponse({
            msgHU: "Ha mint cég akar folgalni, akkor kötelező megadnia a cég adószámat!",
            msgEN: "If you want to book as company, then you must enter the tax number of the company!",
          });
      }

      if (!checkLeaveDate(newArrive, newLeave))
        return new ApiResponse({
          msgHU: "A távozás napja legalább az érkezés időpontja után 1 nappal kell, hogy legyen!",
          msgEN: "The day of leave must be at least 1 day after the date of arrival!",
        });

      if (data.customer.underTwoYear && data.customer.numberOfKids <= 0)
        return new ApiResponse({
          msgHU: "Amennyiben van két évnél fiatlabb gyermek vendég, kérjük tüntesse fel azt a gyerekek számánál!",
          msgEN: "If you have a children under two years old, then please indicate that in the number of children!",
        });

      if (
        (data.customer.babyBed || data.customer.highChair) &&
        !data.customer.underTwoYear &&
        data.customer.numberOfKids > 0
      )
        return new ApiResponse({
          msgHU: "Nem kérhet úgy etetőszéket/babágyat úgy, hogy egy gyermek sem két éven aluli!",
          msgEN: "You can't ask for high chair/baby bed if there is no kids under two years old!",
        });

      if (data.customer.numberOfAdults + data.customer.numberOfKids > apartment.capacity.capacity)
        return new ApiResponse({
          msgHU: "A távozás napja legalább az érkezés időpontja után 1 nappal kell, hogy legyen!",
          msgEN: "The day of leave must be at least 1 day after the date of arrival!",
        });

      const isFree = apartment.reservations.every((e) => {
        const arrive = setToZero(e.arrive);
        const leave = setToZero(e.leave);
        return (newArrive < arrive && newLeave < arrive) || newArrive > newLeave;
      });
      if (!isFree)
        return new ApiResponse(
          {
            msgHU: `A ${GetSimpleDateString(newArrive, "hu")} - ${GetSimpleDateString(
              newLeave,
              "hu"
            )} időszakban nem elérhető a(z) ${apartment.name}.`,
            msgEN: `In the ${GetSimpleDateString(newArrive, "hu")} - ${GetSimpleDateString(
              newLeave,
              "hu"
            )} time intervall, the ${apartment.name} is not avivable.`,
          },
          400
        );
      const newReservation = await Reservation.create({ ...data, apartment: apartment });
      apartment.reservations.push(newReservation);
      await apartment.save();
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }
}

const checkArriveDate = (date: Date) => {
  const asd = setToZero(new Date());
  if (date <= setToZero(new Date())) return false;
  console.log(date <= asd);

  return true;
};

const checkLeaveDate = (arrive: Date, leave: Date) => {
  if (arrive >= leave) return false;
  return true;
};

export default new ReservationServices();
