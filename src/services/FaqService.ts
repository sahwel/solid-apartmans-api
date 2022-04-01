import { Request } from "express";
import { FAQCRUD } from "../interfaces/Faq/FaqCurd";
import { FaqDto } from "../interfaces/Faq/FaqDtos";
import ApiResponse from "../models/ApiResponse";
import Faq from "../models/Entity/Faq";
import createEditFaqValidation from "../validation/Faq/CreateEditFaqValidation";

class FaqService implements FAQCRUD {
  async getAdmin() {
    try {
      const faqs = await Faq.find();
      return new ApiResponse({ faqs });
    } catch (error) {
      throw error;
    }
  }

  async get(req: Request) {
    try {
      let lang = req.headers["accept-language"]?.toLowerCase();
      if (lang === "hu" || lang === "hu-HU") lang = "HU";
      if (!lang || lang === "en" || lang === "en-US") lang = "EN";
      const faqs = await Faq.find().select(`question${lang} answer${lang}`);
      const mappedFaqs = faqs.map((el) => ({
        question: lang === "HU" ? el.questionHU : el.questionEN,
        answer: lang === "HU" ? el.answerHU : el.answerEN,
      }));
      return new ApiResponse({ faqs: mappedFaqs });
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

      await Faq.create({ ...data });
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: FaqDto) {
    try {
      if (!id) return new ApiResponse({ msg: "Param id is required! (Paraméter id kötelező!)" });
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
      if (!id) return new ApiResponse({ msg: "Param id is required! (Paraméter id kötelező!)" });

      await Faq.findByIdAndDelete(id);
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }
}

export default new FaqService();
