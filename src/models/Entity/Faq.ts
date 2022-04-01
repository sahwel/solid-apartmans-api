import mongoose from "mongoose";
import { stringRequired } from "../../helpers/definitions/modelDefinitions";
import { FaqModel } from "../../interfaces/Faq/FaqDtos";

const faqSchema = new mongoose.Schema<FaqModel>({
  answerEN: {
    ...stringRequired,
    min: 1,
    max: 1024,
  },
  answerHU: {
    ...stringRequired,
    min: 1,
    max: 1024,
  },
  questionEN: {
    ...stringRequired,
    min: 1,
    max: 256,
  },
  questionHU: {
    ...stringRequired,
    min: 1,
    max: 256,
  },
});
export default mongoose.model<FaqModel>("Faq", faqSchema);
