import ApiResponse from "../../models/ApiResponse";
import { ApartmentDto, FacilityDto } from "./AparmentDtos";

export interface FacilityCrud {
  create: (data: FacilityDto, img?: Express.Multer.File) => Promise<ApiResponse>;
  update: (id: string, data: FacilityDto, img?: Express.Multer.File) => Promise<ApiResponse>;
  delete: (id: string) => Promise<ApiResponse>;
  getAll: () => Promise<ApiResponse>;
}

export interface ApartmentCrud {
  create: (data: ApartmentDto, imgs?: Express.Multer.File[]) => Promise<ApiResponse>;
  getAdminHome: () => Promise<ApiResponse>;
  getAdmin: (id: string) => Promise<ApiResponse>;
  get: (id: string) => Promise<ApiResponse>;
  getHome: () => Promise<ApiResponse>;
}
