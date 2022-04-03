import ApiResponse from "../models/ApiResponse";
import { unlink } from "fs";
import { ApartmentCrud } from "../interfaces/Apartment/ApartmentCruds";
import { ApartmentDto } from "../interfaces/Apartment/AparmentDtos";
import Apartment from "../models/Entity/Apartment";
import validateApartment from "../validation/Apartment/ValidateApartment";

class ApartmentService implements ApartmentCrud {
  async create(data: ApartmentDto, imgs?: Express.Multer.File[]) {
    try {
      const dataValidation = validateApartment(data);
      if (dataValidation.error) {
        if (imgs && imgs.length !== 0)
          imgs.forEach((img) => {
            unlink(img.path, function (err) {});
          });

        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );
      }

      if (!imgs || imgs.length === 0)
        return new ApiResponse({
          msg: "You must upload an image for an apartment! (Kép feltöltése kötelező egy apartman létrehozásához!",
        });

      await Apartment.create({ ...data, images: imgs.map((e) => e.path) });
      return new ApiResponse();
    } catch (error) {
      if (imgs && imgs?.length !== 0)
        imgs.forEach((img) => {
          unlink(img.path, function (err) {});
        });
      throw error;
    }
  }

  async getAdminHome() {
    try {
      const apartments = await Apartment.find().select("_id name address");
      return new ApiResponse(apartments);
    } catch (error) {
      throw error;
    }
  }

  async getAdmin(id: string) {
    try {
      if (!id) return new ApiResponse({ msg: "Param id is required! (Paraméter id kötelező!)" });
      const apartment = await Apartment.findById(id).select("-__v");
      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);
      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async get(id: string) {
    try {
      if (!id) return new ApiResponse({ msg: "Param id is required! (Paraméter id kötelező!)" });
      const apartment = await Apartment.findById(id).select("-__v"); // todo: -reservations if it will exits
      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);
      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async getHome() {
    try {
      const apartments = await Apartment.find()
        .select("-__v -detailsEN -detailsHU") // todo: -reservations if it will exits
        .populate({ path: "facilities", select: "-__v" })
        .populate({ path: "reviews", select: "stars" });

      const mappedApartments = apartments.map((e) => ({
        name: e.name,
        address: { ...e.address },
        capacity: { ...e.capacity },
        price: e.price,
        plusPrice: e.plusPrice,
        reviews: e.reviews.reduce((partialSum, a) => partialSum + a.stars, 0),
        facilities: e.facilities,
      }));

      return new ApiResponse(mappedApartments);
    } catch (error) {
      throw error;
    }
  }
}

export default new ApartmentService();
