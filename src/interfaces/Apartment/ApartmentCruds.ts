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
  update: (id: string, data: ApartmentDto) => Promise<ApiResponse>;
  getAdminHome: () => Promise<ApiResponse>;
  getAdmin: (id: string) => Promise<ApiResponse>;
  get: (id: string) => Promise<ApiResponse>;
  getHome: () => Promise<ApiResponse>;
  getBookDatas: (id: string) => Promise<ApiResponse>;
  addImages: (id: string, imgs?: Express.Multer.File[]) => Promise<ApiResponse>;
  deleteImage: (id: string, index: number) => Promise<ApiResponse>;
  moveImg: (id: string, index: number, isUp: boolean, toFirst: boolean) => Promise<ApiResponse>;
  getApartmentsNames: () => Promise<ApiResponse>;
}
