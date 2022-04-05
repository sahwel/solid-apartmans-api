import { Request } from "express";
import ApiResponse from "../../models/ApiResponse";
import { FaqDto } from "./FaqDtos";

export interface FAQCRUD {
  create: (data: FaqDto) => Promise<ApiResponse>;
  update: (id: string, data: FaqDto) => Promise<ApiResponse>;
  delete: (id: string) => Promise<ApiResponse>;
  get: () => Promise<ApiResponse>;
}
