import { GetSimpleDateString, setToZero } from "../helpers/services/dateFormating";
import { CreateReservationDto, ReservationCRUD } from "../interfaces/Reservation.ts/Definitions";
import ApiResponse from "../models/ApiResponse";
import Apartment from "../models/Entity/Apartment";
import Reservation from "../models/Entity/Reservation";
import validateReservation from "../validation/Reservation/ReservationValidationt";
import { ObjectId } from "mongodb";
import { ApartmentModel } from "../interfaces/Apartment/Definitions";
class ReservationServices implements ReservationCRUD {
  async getAdmin(query: any) {
    try {
      let apartment = query.apartment;
      const freeText = query.freeText;
      const start = query.start;
      const end = query.end;

      let queryDB = {};
      if (apartment) {
        apartment = new ObjectId(apartment);
        queryDB = { ...queryDB, apartment: apartment as ObjectId };
      }

      if (freeText)
        queryDB = {
          ...queryDB,
          $or: [
            { "customer.firstName": { $regex: freeText, $options: "i" } },
            { "customer.lastName": { $regex: freeText, $options: "i" } },
            { "customer.email": { $regex: freeText, $options: "i" } },
            { "customer.phone": { $regex: freeText, $options: "i" } },
            { "customer.companyName": { $regex: freeText, $options: "i" } },
            { "customer.taxNumber": { $regex: freeText, $options: "i" } },
          ],
        };

      if (start) queryDB = { ...queryDB, arrive: { $gte: setToZero(start) } };
      if (end) queryDB = { ...queryDB, leave: { $lte: setToZero(end) } };

      let result = await Reservation.find({ ...queryDB })
        .select("-__v")
        .populate({ path: "apartment", select: "name" })
        .sort([["arrive", 1]]);

      return new ApiResponse({ result });
    } catch (error) {
      throw error;
    }
  }

  async get(apartment: string) {
    try {
      const dbResult = await Reservation.find({ apartment: apartment, arrive: { $gte: setToZero(new Date()) } }).select(
        "arrive leave"
      );

      let result: Date[] = [];
      dbResult.forEach((e) => {
        const dates = this.getDaysArray(e.arrive, e.leave);
        if (dates instanceof Array) result = result.concat(dates);
        else result.push(dates);
      });
      return new ApiResponse({ result });
    } catch (error) {
      throw error;
    }
  }

  getDaysArray(start: Date | string, end: Date | string) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  async getFreeTimeEnd(query: any) {
    try {
      const start = query.start;
      if (!start)
        return new ApiResponse({ msgEN: "You must need to specify the arrive date for get the free time end!" });
      const result = await Reservation.find({ arrive: { $gte: setToZero(start) } })
        .select("arrive")
        .sort([["arrive", 1]])
        .limit(1);

      return new ApiResponse({ result: result.length === 1 ? result[0].arrive : [] });
    } catch (error) {
      throw error;
    }
  }

  async create(id: string, data: CreateReservationDto) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id param??ter k??telez??!", "The param id is required!");
      const dataValidation = validateReservation(data);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      const apartment = await Apartment.findById(id)
        .select("name reservations capacity price plusPrice")
        .populate("reservations");

      if (!apartment) return new ApiResponse({ msgHU: "Apartman nem tal??lhat??!", msgEN: "Apartment not found" }, 404);

      data.arrive = setToZero(data.arrive);
      data.leave = setToZero(data.leave);

      const newArrive = data.arrive;
      const newLeave = data.leave;
      console.log(newArrive);

      if (!checkArriveDate(newArrive))
        return new ApiResponse({
          msgHU: "Az ??rekz??s napja legal??bb, a foglal??s id??pontja ut??n 1 nappal kell, hogy legyen!",
          msgEN: "The arrive date is must be after the date of booking",
        });

      if (data.method !== "bank transfer" && data.method !== "credit card")
        return ApiResponse.withLocalize(
          "Csak bankk??rty??s vagy bakni ??tutal??ssal lehet fizetni",
          "You can only pay with credit card or you can bank transfer!",
          400
        );
      if (!data.customer.privatePerson) {
        if (!data.customer.companyName || data.customer.companyName.length === 0)
          return new ApiResponse({
            msgHU: "Ha mint c??g akar folgalni, akkor k??telez?? megadnia a c??g nev??t!",
            msgEN: "If you want to book as company, then you must enter the name of the company!",
          });

        if (!data.customer.taxNumber)
          return new ApiResponse({
            msgHU: "Ha mint c??g akar folgalni, akkor k??telez?? megadnia a c??g ad??sz??mat!",
            msgEN: "If you want to book as company, then you must enter the tax number of the company!",
          });
      }

      if (!checkLeaveDate(newArrive, newLeave))
        return new ApiResponse({
          msgHU: "A t??voz??s napja legal??bb az ??rkez??s id??pontja ut??n 1 nappal kell, hogy legyen!",
          msgEN: "The day of leave must be at least 1 day after the date of arrival!",
        });

      if (data.customer.underTwoYear && data.customer.numberOfKids <= 0)
        return new ApiResponse({
          msgHU: "Amennyiben van k??t ??vn??l fiatlabb gyermek vend??g, k??rj??k t??ntesse fel azt a gyerekek sz??m??n??l!",
          msgEN: "If you have a children under two years old, then please indicate that in the number of children!",
        });

      if (
        (data.customer.babyBed || data.customer.highChair) &&
        !data.customer.underTwoYear &&
        data.customer.numberOfKids > 0
      )
        return new ApiResponse({
          msgHU: "Nem k??rhet ??gy etet??sz??ket/bab??gyat ??gy, hogy egy gyermek sem k??t ??ven aluli!",
          msgEN: "You can't ask for high chair/baby bed if there is no kids under two years old!",
        });

      if (data.customer.numberOfAdults + data.customer.numberOfKids > apartment.capacity.capacity)
        return new ApiResponse({
          msgHU: "A t??voz??s napja legal??bb az ??rkez??s id??pontja ut??n 1 nappal kell, hogy legyen!",
          msgEN: "The day of leave must be at least 1 day after the date of arrival!",
        });

      const isFree = apartment.reservations.every((e) => {
        const arrive = setToZero(e.arrive);
        const leave = setToZero(e.leave);

        return (newArrive < arrive && newLeave < arrive) || newArrive > leave;
      });

      if (!isFree)
        return new ApiResponse(
          {
            msgHU: `A ${GetSimpleDateString(newArrive, "hu")} - ${GetSimpleDateString(
              newLeave,
              "hu"
            )} id??szakban nem el??rhet?? a(z) ${apartment.name}.`,
            msgEN: `In the ${GetSimpleDateString(newArrive, "hu")} - ${GetSimpleDateString(
              newLeave,
              "hu"
            )} time intervall, the ${apartment.name} is not avivable.`,
          },
          400
        );
      const newReservation = await Reservation.create({
        ...data,
        apartment: apartment,
        total: getTotal(apartment, newArrive, newLeave, data.customer.numberOfAdults, data.customer.numberOfKids),
      });
      apartment.reservations.push(newReservation);
      await apartment.save();
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }

  async setPayed(id: string) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id param??ter k??telez??!", "The param id is required!");
      const reservation = await Reservation.findById(id).select(
        "payed method customer.firstName customer.lastName arrive leave"
      );

      if (!reservation) return ApiResponse.withLocalize("Nincs ilyen foglal??s", "Reservation not found!", 404);
      if (reservation.method === "credit card")
        return ApiResponse.withLocalize(
          "Nem tudod ??t??ll??tani a bankk??rty??s fizet??sek ??llapot??t!",
          "You can't modify the credit cards payment!"
        );
      reservation.payed = !reservation.payed;
      await reservation.save();
      return ApiResponse.withLocalize(
        `Foglal??s (${reservation.customer.lastName + " " + reservation.customer.firstName} ${
          GetSimpleDateString(reservation.arrive) + "-" + GetSimpleDateString(reservation.leave)
        } ) sikeresen ??t??ll??tva ${reservation.payed ? "kifizetv??re" : "nincs kifizetv??re"}!`,
        `Reservation (id: ${id}) is modifyed to ${reservation.payed ? "payed" : "not payed"}!`,
        200
      );
    } catch (error) {
      throw error;
    }
  }

  async getTotalAsync(id: string, arrive: Date, leave: Date, numbersOfAdults: number, numbersOfChilds: number) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id param??ter k??telez??!", "The param id is required!");
      const apartment = await Apartment.findById(id).select("price plusPrice");

      if (!apartment) return ApiResponse.withLocalize("Apartman nem tal??lhat??!", "Apartment not found!", 404);
      return new ApiResponse({ total: getTotal(apartment, arrive, leave, numbersOfAdults, numbersOfChilds) });
    } catch (error) {
      throw error;
    }
  }
}

const checkArriveDate = (date: Date) => {
  if (date <= setToZero(new Date())) return false;
  return true;
};

const checkLeaveDate = (arrive: Date, leave: Date) => {
  if (arrive >= leave) return false;
  return true;
};

const getTotal = (
  apartment: ApartmentModel,
  arrive: Date,
  leave: Date,
  numbersOfAdults: number,
  numbersOfChilds: number
) => {
  const dayInMillis = 86400000;
  const ifa = 1.04;
  let people = numbersOfAdults + numbersOfChilds - 1;
  let days = (setToZero(leave).getTime() - setToZero(arrive).getTime()) / dayInMillis;

  return days * (apartment.price + apartment.plusPrice * people) * ifa;
};

export default new ReservationServices();
