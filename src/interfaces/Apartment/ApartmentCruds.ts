import ApiResponse from "../../models/ApiResponse";
import { FacilityDto } from "./AparmentDtos";

export interface FacilityCrud {
  create: (data: FacilityDto, img?: Express.Multer.File) => Promise<ApiResponse>;
  update: (id: string, data: FacilityDto, img?: Express.Multer.File) => Promise<ApiResponse>;
  delete: (id: string) => Promise<ApiResponse>;
  getAll: () => Promise<ApiResponse>;
}
