import { FacilityDto } from "../interfaces/Apartment/AparmentDtos";
import { FacilityCrud } from "../interfaces/Apartment/ApartmentCruds";
import ApiResponse from "../models/ApiResponse";
import Facility from "../models/Entity/Facility";
import validateFacility from "../validation/Apartment/ValidateFacility";
import { unlink } from "fs";

class FacilityServices implements FacilityCrud {
  async update(id: string, data: FacilityDto, img?: Express.Multer.File) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const dataValidation = validateFacility(data);
      if (dataValidation.error) {
        if (img) unlink(img.path, function (err) {});
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );
      }

      if (!img) {
        await Facility.updateOne({ _id: id }, { nameEN: data.nameEN, nameHU: data.nameHU });
        return new ApiResponse();
      }

      await Facility.updateOne({ _id: id }, { url: img.path, nameEN: data.nameEN, nameHU: data.nameHU });
      return new ApiResponse();
    } catch (error) {
      if (img) unlink(img.path, function (err) {});
      throw error;
    }
  }

  async delete(id: string) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const facility = await Facility.findById(id).select("url");
      if (!facility) return new ApiResponse({ msg: "The facility not found! (A felszerelés nem található)!" }, 404);

      unlink(facility.url, function (err) {
        if (err) throw { msg: "An error occupied during the request! (Egy hiba lépett fel a kérés során!)", err };
      });

      await Facility.deleteOne({ _id: id });
      //todo delete from apartments
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }

  async create(data: FacilityDto, img?: Express.Multer.File) {
    try {
      const dataValidation = validateFacility(data);
      if (dataValidation.error) {
        if (img) unlink(img.path, function (err) {});

        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );
      }

      if (!img)
        return new ApiResponse({
          msg: "You must upload an image for a facility! (Kép feltöltése kötelező egy felszerelés létrehozásához!",
        });

      await Facility.create({ url: img.path, nameEN: data.nameEN, nameHU: data.nameHU });
      return new ApiResponse();
    } catch (error) {
      if (img) unlink(img.path, function (err) {});
      throw error;
    }
  }

  async getAll() {
    try {
      const assets = await Facility.find().select("-__v");
      const result = assets.map((el) => ({ _id: el._id, nameHU: el.nameHU, url: el.url }));
      return new ApiResponse(result);
    } catch (error) {
      throw error;
    }
  }
}

export default new FacilityServices();
