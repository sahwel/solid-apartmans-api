import { Address, capacity, Facility } from "./Definitions";

export interface FacilityDto {
  nameEN: string;
  nameHU: string;
  img?: Express.Multer.File;
}

export interface ApartmentDto {
  name: string;
  address: Address;
  facilities: string[];
  capacity: capacity;
  price: number;
  detailsHU: string;
  detailsEN: string;
  plusPrice: number;
}
