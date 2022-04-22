import { Request } from "express";
import { FAQCRUD } from "../interfaces/Faq/FaqCurd";
import { FaqDto } from "../interfaces/Faq/FaqDtos";
import ApiResponse from "../models/ApiResponse";
import Faq from "../models/Entity/Faq";
import createEditFaqValidation from "../validation/Faq/CreateEditFaqValidation";

class FaqService implements FAQCRUD {
  async get() {
    try {
      const faqs = await Faq.find().select("-__v");

      return new ApiResponse(faqs);
    } catch (error) {
      throw error;
    }
  }

  async create(data: FaqDto) {
    try {
      const dataValidation = createEditFaqValidation(data);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      const faq = await Faq.create({ ...data });
      return new ApiResponse(faq._id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: FaqDto) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");
      const dataValidation = createEditFaqValidation(data);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      await Faq.updateOne({ _id: id }, { ...data });
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      if (!id) return ApiResponse.withLocalize("Az id paraméter kötelező!", "The param id is required!");

      await Faq.findByIdAndDelete(id);
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }
}

export default new FaqService();
