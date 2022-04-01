import mongoose from "mongoose";
import { stringRequired } from "../../helpers/definitions/modelDefinitions";
import { FaqModel } from "../../interfaces/Faq/FaqDtos";

const faqSchema = new mongoose.Schema<FaqModel>({
  answerEn: {
    ...stringRequired,
    min: 1,
    max: 1024,
    required: true,
  },
  answerHu: {
    ...stringRequired,
    min: 1,
    max: 1024,
    required: true,
  },
  questionEn: {
    ...stringRequired,
    min: 1,
    max: 256,
    required: true,
  },
  questionHu: {
    ...stringRequired,
    min: 1,
    max: 256,
    required: true,
  },
});
export default mongoose.model<FaqModel>("Faq", faqSchema);
