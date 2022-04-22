import ApiResponse from "../models/ApiResponse";
import { ApartmentCrud } from "../interfaces/Apartment/ApartmentCruds";
import { ApartmentDto } from "../interfaces/Apartment/AparmentDtos";
import Apartment from "../models/Entity/Apartment";
import validateApartment from "../validation/Apartment/ValidateApartment";
import ImageService from "./ImageService";

class ApartmentService implements ApartmentCrud {
  async create(data: ApartmentDto, imgs?: Express.Multer.File[]) {
    try {
      const dataValidation = validateApartment(data);
      if (dataValidation.error) {
        if (imgs && imgs.length !== 0) ImageService.deleteImgs(imgs);

        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );
      }

      if (!imgs || imgs.length === 0)
        return new ApiResponse({
          msg: "You must upload an image for an apartment! (Kép feltöltése kötelező egy apartman létrehozásához!)",
        });

      await Apartment.create({ ...data, images: imgs.map((e) => "uploads/" + e.filename) });
      return new ApiResponse();
    } catch (error) {
      if (imgs && imgs?.length !== 0) ImageService.deleteImgs(imgs);
      throw error;
    }
  }

  async addImages(id: string, imgs?: Express.Multer.File[]) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      if (!imgs || imgs.length === 0)
        return new ApiResponse({
          msg: "Image(s) missing, please upload an image! (Hiányzó kép(ek), kérlek tölts fel legalább egy képet!)",
        });

      const apartment = await Apartment.findById(id).select("images");
      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);

      imgs.forEach((el) => {
        apartment.images.push("uploads/" + el.filename);
      });
      await apartment.save();
      return new ApiResponse();
    } catch (error) {
      if (imgs && imgs?.length !== 0) ImageService.deleteImgs(imgs);
      throw error;
    }
  }

  async update(id: string, data: ApartmentDto) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const dataValidation = validateApartment(data);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      await Apartment.updateOne({ _id: id }, { ...data });
      return new ApiResponse();
    } catch (error) {
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
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const apartment = await Apartment.findById(id).select("-__v").populate({ path: "facilities", select: "-__v" });

      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);
      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async get(id: string) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const apartment = await Apartment.findById(id)
        .select("-__v") // todo: -reservations if it will exits
        .populate({ path: "facilities", select: "-__v -_id" })
        .populate({ path: "reviews", select: "-__v -_id" });
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
        _id: e._id,
        name: e.name,
        address: { ...e.address },
        capacity: { ...e.capacity },
        price: e.price,
        plusPrice: e.plusPrice,
        stars: e.reviews.reduce((partialSum, a) => partialSum + a.stars, 0),
        image: e.images[0],
        facilities: e.facilities,
      }));

      return new ApiResponse(mappedApartments);
    } catch (error) {
      throw error;
    }
  }

  async getBookDatas(id: string) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const apartment = await Apartment.findById(id).select("_id name address ");
      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);

      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(id: string, index: number) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const apartment = await Apartment.findById(id).select("images");
      if (!apartment) return new ApiResponse({ msg: "Apartment not found! (Apartman nem találató!)" }, 404);
      if (index < 0 || index > apartment.images.length - 1)
        return new ApiResponse({ msg: "Image not found! (Kép nem található!)" }, 404);
      if (apartment.images.length === 1)
        return new ApiResponse(
          {
            msgEN: "An apartment must need to contains at least 1 image!",
            msgHU: "Minden apartmannak legalább 1 képet tartalmaznia kell!",
          },
          400
        );
      apartment.images.splice(index, 1);
      ImageService.deleteImg(apartment.images[index]);
      await apartment.save();
      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async moveImg(id: string, index: number, isUp: boolean, toFirst: boolean) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const apartment = await Apartment.findById(id).select("images");
      if (!apartment) return new ApiResponse({ msgEN: "Apartment not found!", msgHU: "Apartman nem találató!" }, 404);
      if ((isUp || toFirst) && index === 0)
        return new ApiResponse(
          { msgEN: "You can't move the first image up!", msgHU: "Nem mozgathatod feljebb az első képet!" },
          404
        );
      if (!isUp && !toFirst && index === apartment.images.length - 1)
        return new ApiResponse(
          { msgEN: "You can't move the last image down!", msgHU: "Nem mozgathatod lejebb az utolsó képet!" },
          404
        );
      const oldImg = apartment.images[toFirst ? 0 : index - (isUp ? 1 : -1)];
      apartment.images[toFirst ? 0 : index - (isUp ? 1 : -1)] = apartment.images[index];
      apartment.images[index] = oldImg;

      await apartment.save();
      return new ApiResponse(apartment);
    } catch (error) {
      throw error;
    }
  }

  async getApartmentsNames() {
    try {
      const apartments = await Apartment.find().select("_id name");

      return new ApiResponse({ apartments });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const apartments = await Apartment.findOneAndDelete({ _id: id });

      return new ApiResponse({ apartments });
    } catch (error) {
      throw error;
    }
  }
}

export default new ApartmentService();
